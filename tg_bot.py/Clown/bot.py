import asyncio

from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.types import Message, ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters.command import Command


from config import TOKEN

bot = Bot(
    token = TOKEN,
    default = DefaultBotProperties(parse_mode= ParseMode.HTML)
)

dp = Dispatcher()

main_menu = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text = "Каталог"), KeyboardButton(text="Корзина")],
        [KeyboardButton(text="Помощь")]
    ],
    resize_keyboard=True,
    input_field_placeholder="Выберете раздел"
)

@dp.message(Command("start"))
async def start(message: Message):
    await message.answer(
        "<b>🌸 Flower Shop</b>\n"
        "<i>Добро пожаловать!</i>\n"
        "\n"
        "Выберете раздел:",
        reply_markup=main_menu
    )


@dp.message(lambda m: m.text == "Каталог")
async def catalog(message: Message):
    catalog_keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardMarkup(text="🌹 Роза - 9byn", callback_data="buy_rose")],
            [InlineKeyboardMarkup(text="🌷 Тюльпан - 3.50byn", callback_data="buy_tulip")],
            [InlineKeyboardMarkup(text="💐 Букет - от 35byn", callback_data="buy_bouquet")]
        ]
)
    await message.answer(
        "<b>Каталог цветов:</b>\nВыберете товары:",
        reply_markup=catalog_keyboard
    )

@dp.message(lambda m: m.text == "Корзина")
async def cart(message: Message):
    await message.answer("Ваша корзина пуста.")

@dp.message(lambda m: m.text == "Помощь")
async def help_(message: Message):
    await message.answer("Команда /start открывает меню.\n 'Каталог' — товары, \n'Корзина' — ваши покупки.")



async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())