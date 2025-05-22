import asyncio
import pytz
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    ContextTypes
)
from apscheduler.schedulers.asyncio import AsyncIOScheduler

TOKEN = "7283679641:AAEPapvJ1AgdNmurSPZ6Xou3ouQY9hJSfP8"

  # 請貼上你從 BotFather 拿到的 token
WEB_APP_URL = "https://cfmcloud.web.app/"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton("打開 Mini App", web_app={"url": WEB_APP_URL})]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("歡迎使用 Telegram Mini App！", reply_markup=reply_markup)

async def setup_bot():
    # 正確設置 scheduler，避免時區錯誤
    scheduler = AsyncIOScheduler(timezone=pytz.UTC)
    scheduler.start()

    app = (
        ApplicationBuilder()
        .token(TOKEN)
        .build()
    )

    app.add_handler(CommandHandler("start", start))
    await app.initialize()
    await app.start()
    print("✅ Bot 已啟動，等待使用者互動...（Ctrl+C 停止）")
    await app.updater.start_polling()
    await app.updater.idle()

# ✅ 執行方式改為這樣，避免 asyncio.run() 的問題
loop = asyncio.get_event_loop()
loop.create_task(setup_bot())
loop.run_forever()