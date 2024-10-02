import express, { json } from "express";
import cors from "cors";
import updateFiles from "./services/updateFiles";
import apiResLogger from "./services/apiResLogger";

const app = express();
app.use(cors());
app.use(json());
const port = 3000;

// /my-express-app
// │
// ├── /src
// │   ├── /controllers      # Логика обработки запросов
// │   ├── /routes           # Определение маршрутов
// │   ├── /middlewares       # Промежуточные обработчики
// │   ├── /models           # Модели данных (если используете БД)
// │   ├── /services         # Логика бизнес-уровня
// │   ├── /utils            # Утилиты и вспомогательные функции
// │   ├── /config           # Конфигурационные файлы
// │   └── app.js            # Основной файл приложения
// │
// ├── /tests                # Тесты
// ├── package.json
// └── .env                  # Файл окружения

(async () => {
  try {
    const res = await updateFiles();
    apiResLogger(res);

    if (res.status !== "success") {
      throw new Error(res.error);
    } else {
      console.log("data sent and received");
    }
    process.exit(0);
  } catch (error) {
    console.error("Программа не была выполнена\n", error);
    throw error as Error;
  }
})();

app.listen(port, () => {
  console.log("Listening");
});
