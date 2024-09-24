const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const token = "7521542463:AAEDti3y-zujYBzko8bNRC7zI8q1BeILWRM"; // Читаем токен из переменной окружения
const bot = new TelegramBot(token, { polling: false });

// Устанавливаем webhook URL
const WEBHOOK_URL = process.env.WEBHOOK_URL; // Читаем вебхук URL из переменной окружения
bot.setWebHook(WEBHOOK_URL);

// Middleware для обработки JSON
app.use(express.json());

// Обрабатываем вебхуки
app.post("/api/bot", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Команда /start для тестирования
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть магазин",
            web_app: { url: "https://gameshop-pi-blush.vercel.app/" },
          },
        ],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    "Добро пожаловать в наш магазин игр! Нажмите на кнопку ниже, чтобы открыть приложение.",
    options
  );
});

module.exports = app; // Экспортируем express приложение
