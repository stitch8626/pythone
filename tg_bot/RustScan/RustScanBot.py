import asyncio
import aiohttp

from aiogram import Bot, Dispatcher, F, Router
from aiogram.types import (
    Message,
    ReplyKeyboardMarkup,
    KeyboardButton,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    CallbackQuery,
)
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.filters import Command
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.context import FSMContext

from RustScanBotConfing import TOKEN


BM_BASE_URL = "https://api.battlemetrics.com"

bot = Bot(
    token=TOKEN,
    default=DefaultBotProperties(parse_mode=ParseMode.HTML),
)

dp = Dispatcher()
router = Router()
dp.include_router(router)


# ---------- FSM ----------

class SearchServer(StatesGroup):
    waiting_server_name = State()


# ---------- ВСПОМОГАТЕЛЬНОЕ ----------

def escape_html(text: str) -> str:
    """Экран миров HTML-спецсимволы, чтобы имя/строки не ломали разметку."""
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


# ---------- Клавиатуры ----------

main_menu = ReplyKeyboardMarkup(
    keyboard=[
        [
            KeyboardButton(text="Найти сервер🗄️"),
            # KeyboardButton(text="Избранные сервара💾"),
        ],
        [
            KeyboardButton(text="Найти игрока👤"),
            KeyboardButton(text="Отслеживаемые игроки👥"),
        ],
        [KeyboardButton(text="Статистика📊")],
        [KeyboardButton(text="Premium💎подписка")],
        [KeyboardButton(text="нашли баги или ошибку пишите сюда 👾🛠️")],
    ],
    resize_keyboard=True,
    one_time_keyboard=False,
)


def build_server_inline_kb(server_id: str) -> InlineKeyboardMarkup:
    kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🔄 Обновить",
                    callback_data=f"server_refresh:{server_id}",
                ),
                InlineKeyboardButton(
                    text="👥 Игроки онлайн",
                    callback_data=f"server_players:{server_id}:1",
                ),
            ],
            [
                InlineKeyboardButton(
                    text="📜 История игроков сервера",
                    callback_data=f"server_history:{server_id}",
                )
            ],
        ]
    )
    return kb


# ---------- BattleMetrics ----------

async def search_rust_servers(name: str, page_size: int = 50):
    url = f"{BM_BASE_URL}/servers"
    params = {
        "filter[game]": "rust",
        "filter[search]": name,
        "page[size]": page_size,
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params) as resp:
            if resp.status != 200:
                print("BattleMetrics error status:", resp.status)
                return []
            data = await resp.json()
            return data.get("data", [])


async def get_server_by_id(server_id: str):
    url = f"{BM_BASE_URL}/servers/{server_id}"

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            if resp.status != 200:
                print("BattleMetrics error status:", resp.status)
                return None
            data = await resp.json()
            return data.get("data")


def build_server_message(server: dict) -> str:
    attrs = server.get("attributes", {})
    name = escape_html(attrs.get("name", "Неизвестно"))
    players = attrs.get("players", 0)
    max_players = attrs.get("maxPlayers", 0)
    ip = attrs.get("ip", "unknown")
    port = attrs.get("port", 0)
    connect = f"connect {ip}:{port}"

    details = attrs.get("details", {}) or {}
    wipe = escape_html(details.get("rust_last_wipe") or "Неизвестно")
    next_wipe = escape_html(details.get("rust_next_wipe") or "Неизвестно")
    map_url = escape_html(details.get("rust_maps_url") or "Неизвестно")

    text = (
        f"<b>{name}</b>\n"
        f"Игроки: <b>{players}/{max_players}</b>\n"
        f"<code>{connect}</code>\n"
        f"Вайп: {wipe}\n"
        f"Следующий вайп: {next_wipe}\n"
        f"Карта сервера: {map_url}"
    )
    return text


# ---------- Список серверов и пагинация ----------

def make_servers_list_text(servers: list, offset: int, limit: int) -> str:
    lines = []
    for i, srv in enumerate(servers[offset: offset + limit], start=offset + 1):
        name = srv.get("attributes", {}).get("name", "Без имени")
        lines.append(f"{i}. {name}")
    if not lines:
        return "Ничего не найдено."
    return "Найденные сервера:\n\n" + "\n".join(lines)


def make_servers_list_keyboard(servers: list, offset: int, limit: int) -> InlineKeyboardMarkup:
    kb = InlineKeyboardMarkup(inline_keyboard=[])
    rows = []

    for i, srv in enumerate(servers[offset: offset + limit], start=offset + 1):
        name = srv.get("attributes", {}).get("name", "Без имени")
        btn_text = f"{i}. {name[:40]}"
        rows.append([InlineKeyboardButton(text=btn_text, callback_data=f"srvsel:{i - 1}")])

    kb.inline_keyboard.extend(rows)

    if offset + limit < len(servers):
        kb.inline_keyboard.append(
            [InlineKeyboardButton(text="▶️ Показать ещё", callback_data="srvmore")]
        )

    return kb


# ---------- Хендлеры ----------

@dp.message(Command("start"))
async def cmd_start(message: Message):
    safe_name = escape_html(message.from_user.full_name or "")
    await message.answer(
        "<b>🐯 Rust Scan 🐯</b>\n"
        f"<i>Добро пожаловать, {safe_name}.</i>\n"
        "Выберите раздел:",
        reply_markup=main_menu,
    )


@router.message(F.text == "Найти сервер🗄️")
async def ask_server_name(message: Message, state: FSMContext):
    await state.set_state(SearchServer.waiting_server_name)
    await state.update_data(servers=[], offset=0, query="")
    await message.answer(
        "⚙️ Введите название сервера Rust, например:\n"
        "<b>Atlas</b> или <b>Atlas EU</b>"
    )


@router.message(SearchServer.waiting_server_name)
async def handle_server_name(message: Message, state: FSMContext):
    query = message.text.strip()
    if not query:
        await message.answer("❌ Пустой запрос. Попробуйте ещё раз.")
        return

    await message.answer("🔍 Ищу сервера, подождите...")

    servers = await search_rust_servers(query, page_size=50)
    if not servers:
        await message.answer(
            "❌ Серверы не найдены.\n"
            "Попробуйте ввести более точное название или другую часть имени."
        )
        return

    await state.update_data(servers=servers, offset=0, query=query)

    text = make_servers_list_text(servers, offset=0, limit=3)
    kb = make_servers_list_keyboard(servers, offset=0, limit=3)
    # список — обычный текст, без HTML
    await message.answer(text, reply_markup=kb, parse_mode=None)


@router.callback_query(F.data == "srvmore")
async def cb_servers_more(query: CallbackQuery, state: FSMContext):
    data = await state.get_data()
    servers = data.get("servers", [])
    offset = data.get("offset", 0)

    if not servers:
        await query.answer("Нет сохранённых результатов.")
        return

    new_offset = offset + 3
    if new_offset >= len(servers):
        await query.answer("Больше серверов нет.")
        return

    await state.update_data(offset=new_offset)
    text = make_servers_list_text(servers, offset=new_offset, limit=3)
    kb = make_servers_list_keyboard(servers, offset=new_offset, limit=3)

    await query.message.edit_text(text, reply_markup=kb, parse_mode=None)
    await query.answer()


@router.callback_query(F.data.startswith("srvsel:"))
async def cb_server_select(query: CallbackQuery, state: FSMContext):
    idx_str = query.data.split(":", 1)[1]
    try:
        idx = int(idx_str)
    except ValueError:
        await query.answer("Ошибка выбора сервера.")
        return

    data = await state.get_data()
    servers = data.get("servers", [])
    if not servers or idx < 0 or idx >= len(servers):
        await query.answer("Сервер не найден в списке.")
        return

    server = servers[idx]
    server_id = server["id"]

    text = build_server_message(server)
    kb = build_server_inline_kb(server_id)

    await query.message.edit_text(text, reply_markup=kb)
    await query.answer()


@router.callback_query(F.data.startswith("server_refresh:"))
async def cb_server_refresh(query: CallbackQuery):
    server_id = query.data.split(":", 1)[1]

    await query.answer("Обновляю данные...")

    server = await get_server_by_id(server_id)
    if not server:
        await query.message.answer("❌ Не удалось получить данные сервера.")
        return

    text = build_server_message(server)
    kb = build_server_inline_kb(server_id)
    await query.message.edit_text(text, reply_markup=kb)


# ---------- Игроки онлайн (каркас) ----------

def build_players_page_text(server_name: str, players: int, max_players: int, page: int) -> str:
    name_safe = escape_html(server_name)
    text = (
        f"<b>Игроки на сервере:</b> {name_safe}\n"
        f"Онлайн: <b>{players}/{max_players}</b>\n\n"
        f"Список игроков недоступен без API-ключа BattleMetrics.\n\n"
        f"Страница {page}. Выберите нужного игрока."
    )
    return text


def build_players_page_kb(server_id: str, page: int) -> InlineKeyboardMarkup:
    prev_page = max(1, page - 1)
    next_page = page + 1

    kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="⬅️ Назад",
                    callback_data=f"server_players:{server_id}:{prev_page}",
                ),
                InlineKeyboardButton(
                    text="➡️ Далее",
                    callback_data=f"server_players:{server_id}:{next_page}",
                ),
            ]
        ]
    )
    return kb


@router.callback_query(F.data.startswith("server_players:"))
async def cb_server_players(query: CallbackQuery):
    parts = query.data.split(":")
    if len(parts) != 3:
        await query.answer("Некорректные данные.")
        return

    _, server_id, page_str = parts
    try:
        page = int(page_str)
        if page < 1:
            page = 1
    except ValueError:
        page = 1

    server = await get_server_by_id(server_id)
    if not server:
        await query.answer("Сервер не найден.")
        return

    attrs = server.get("attributes", {})
    name = attrs.get("name", "Неизвестно")
    players = attrs.get("players", 0)
    max_players = attrs.get("maxPlayers", 0)

    text = build_players_page_text(name, players, max_players, page)
    kb = build_players_page_kb(server_id, page)

    await query.message.edit_text(text, reply_markup=kb)
    await query.answer()


# ---------- История игроков (заглушка) ----------

@router.callback_query(F.data.startswith("server_history:"))
async def cb_server_history(query: CallbackQuery):
    server_id = query.data.split(":", 1)[1]
    await query.answer()
    await query.message.answer(
        f"📜 История игроков сервера ID {server_id} пока не реализована."
    )


# ---------- запуск ----------

async def main():
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
