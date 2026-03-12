# Todo List API

REST API для управления задачами с JWT авторизацией.

## Стек

- **NestJS** — фреймворк
- **TypeScript** — язык
- **TypeORM** — работа с базой данных
- **PostgreSQL** — база данных
- **JWT** — авторизация
- **Swagger** — документация API

## Запуск через Docker
```bash
docker compose up -d
```

Сервер: http://localhost:3000  
Swagger: http://localhost:3000/api/docs

## Запуск локально
```bash
npm install
cp .env.example .env
npm run start:dev
```

## Переменные окружения
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=todo_db
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PORT=3000
```

## API

### Авторизация
| Метод | URL | Описание |
|-------|-----|----------|
| POST | /auth/register | Регистрация |
| POST | /auth/login | Вход |

### Задачи (требуют JWT токен)
| Метод | URL | Описание |
|-------|-----|----------|
| GET | /tasks | Список задач |
| GET | /tasks?completed=false | Фильтр по статусу |
| GET | /tasks?page=1&limit=10 | Пагинация |
| GET | /tasks/:id | Одна задача |
| POST | /tasks | Создать задачу |
| PATCH | /tasks/:id | Обновить задачу |
| DELETE | /tasks/:id | Удалить задачу |

## Структура проекта
```
src/
├── auth/      — авторизация, JWT
├── users/     — пользователи
├── tasks/     — задачи CRUD
└── common/    — фильтры, интерцепторы
```