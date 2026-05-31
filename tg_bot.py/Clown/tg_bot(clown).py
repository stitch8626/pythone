import asyncio
import logging
import re
from aiogram import Bot, Dispatcher, types, F, html, Router
from aiogram.types import Message, LinkPreviewOptions, Message
from aiogram.enums import ParseMode
from aiogram.filters import Command, CommandObject, CommandStart, BaseFilter
from aiogram.filters.command import Command
from datetime import datetime
from aiogram.client.default import DefaultBotProperties
from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardBuilder
from random import choice 
from typing import Union

from config import TOKEN


logging.basicConfig(level=logging.INFO)

bot = Bot(
    token=TOKEN, 
    default=DefaultBotProperties(
        parse_mode=ParseMode.HTML
    ) 
)

router = Router()

#Диспечер
dp = Dispatcher()
dp["started_at"] = datetime.now().strftime("в %H:%M %d.%m.%Y")
dp["mylist"] = [1, 2, 3]



# Хэндлер команда /start ожидаемый ответ снизу 
@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    kb = [
        [
            types.KeyboardButton(text="20mg"),
            types.KeyboardButton(text="50mg"),
        ]
    ]
    keyboard = types.ReplyKeyboardMarkup(
        keyboard=kb,
        resize_keyboard=True,
        input_field_placeholder="Выбери крепость данной банки"
    )
    await message.answer("Привет! Какую именно тебе?", reply_markup=keyboard)


@dp.message(F.text.lower() == "20mg")
async def light(message: types.Message):
    await message.reply("Хороший выбор", reply_markup=types.ReplyKeyboardRemove())
    
@dp.message(F.text.lower() == "50mg")
async def strong(message: types.Message):
    await message.reply("Отличный выбор", reply_markup=types.ReplyKeyboardRemove())






@dp.message(Command("myid"))
async def cmd_myid(message: types.Message):
    await message.answer(f"Ваш Telegram ID: <code>{message.from_user.id}</code>")



@dp.message(Command("add_to_list"))
async def cmd_add_to_list(message: types.Message, mylist: list[int]):
    mylist.append(3)
    await message.answer("Добавлено число 3")



@dp.message(Command("show_list"))
async def cmd_show_list(message: types.Message, mylist: list[int]):
    await message.answer(f"Ваш <u>список</u>: {mylist}")



@dp.message(Command("info"))
async def cmd_info(message: types.Message, started_at: str):
    await message.reply(f"Бот запущен {started_at}")    

@dp.message(F.text, Command("test"))
async def any_message(message: Message):
    await message.answer(
        "Hello <b>world</b>!",
        parse_mode=ParseMode.HTML
    )

#bold и quote
@dp.message(Command("hello"))
async def cmd_hello(message: Message):
    await message.answer(
        f"Hello, {html.bold(html.quote(message.from_user.full_name))}",
        parse_mode=ParseMode.HTML
    )
    
@dp.message(Command("links"))
async def cmd_links(message: Message):
    links_text = (
        "https://soundcloud.com/ramir-shamelov/prey-scythermane-emrld-treme"
        "\n"
    )
    options = LinkPreviewOptions(
        url= "https://soundcloud.com/ramir-shamelov/prey-scythermane-emrld-treme",
        prefer_large_media=True
    )
    await message.answer(
        f"послушай\n{links_text}",
        link_preview_options=options
    )


async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())