# 🛠️ Todo Manager Backend

A fully backend task management or Todo API built with **Next.js API routes**, **TypeScript**, and **Prisma ORM**. Designed for modular CRUD operations, dynamic filtering, and scalable architecture — ideal for productivity tools and future service integrations.

---



new
## 🚀 Features

- 📦 Modular API routes for tasks and categories
- 🧠 Dynamic filtering by category, status, and priority
- 🛠️ CRUD operations with Prisma ORM
- 🧱 Scalable backend structure for future enhancements

---

## 🧰 Tech Stack

| Layer      | Technology          |
| ---------- | ------------------- |
| Backend    | Next.js API Routes  |
| Language   | TypeScript          |
| Database   | PostgreSQL + Prisma |
| Deployment | Vercel              |

---

## 📂 Project Structure

app/ ├── api/ │ ├── tasks/ # Task CRUD routes │ └── categories/ # Category CRUD routes prisma/ ├── schema.prisma # DB schema lib/ ├── prisma.ts # Prisma client

---

## 🧪 API Endpoints

### Tasks

- `GET /api/tasks` — Fetch all tasks
- `POST /api/tasks` — Create a new task
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task

### Categories

- `GET /api/categories` — Fetch all categories
- `POST /api/categories` — Create category
- `DELETE /api/categories/:id` — Delete category

---

## ⚙️ Prisma Setup

```bash
# Initialize Prisma
npx prisma init

# Generate client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

## 📂 Project Structure

```
