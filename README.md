# MERN Skeleton – Modern Template 🚀

A production-ready MERN starter with **React 19 + TypeScript**, **Vite**, **Tailwind CSS v4**,
**Express 5**, **MongoDB**, **Docker**, and **ESLint/Prettier**. It is also
**shadcn/ui–ready**, so you can drop in a beautiful component library when you need it.

---

## 1. Tech stack

- Frontend
  - React 19 + TypeScript
  - Vite (dev server & build)
  - Tailwind CSS v4
  - shadcn/ui–ready (CLI-based setup, not pre-installed components)
- Backend
  - Node.js (24+ recommended)
  - Express 5
  - MongoDB Node driver 7
- Tooling
  - TypeScript
  - ESLint (flat config) + Prettier
  - Docker & docker-compose

---

## 2. Prerequisites 🔧

- Node.js **24+** and npm
- Docker & Docker Compose (for containerized workflows)
- MongoDB (only required locally if you *don’t* use Docker for the DB)

---

## 3. Local development (no Docker) 🧑‍💻

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure backend environment**
   ```bash
   cp .env.example .env.local
   ```
   Adjust values as needed, for example:
   - `PORT=4000`
   - `MONGODB_URI=mongodb://localhost:27017/mern_skeleton_local`

3. **Configure frontend environment (optional)**
   ```bash
   cp client/.env.example client/.env.local
   ```
   - Default: `VITE_API_BASE_URL=http://localhost:4000`

4. **Run backend + frontend together**
   ```bash
   npm run dev
   ```
   - Vite dev server: http://localhost:5173
   - API health check: http://localhost:4000/api/health

5. **Code formatting & linting**
   ```bash
   # Check lint errors
   npm run lint

   # Fix what can be auto-fixed
   npm run lint:fix

   # Format with Prettier
   npm run format
   ```

---

## 4. Local development with Docker 🐳

1. **Create a local env file**
   ```bash
   cp .env.example .env.local
   ```
   Ensure `MONGODB_URI` points to the `mongo` service defined in
   `docker-compose.local.yml`, for example:
   ```env
   MONGODB_URI=mongodb://mongo:27017/mern_skeleton
   PORT=3000
   NODE_ENV=production
   ```

2. **Build & run containers**
   ```bash
   docker compose -f docker-compose.local.yml up --build
   ```

3. **Access the app**
   - App: http://localhost:3000
   - API health: http://localhost:3000/api/health

4. **Stop containers**
   ```bash
   docker compose -f docker-compose.local.yml down
   ```

---

## 5. Production build & run 🚀

### 5.1. Without Docker

1. **Build client & server**
   ```bash
   npm run build
   ```

2. **Run in production mode**
   ```bash
   npm start
   ```

3. **Visit the app**
   - Default: http://localhost:3000

Ensure you have a production-ready `.env` file (e.g. `.env.production`) or
set environment variables directly when starting the server.

### 5.2. With Docker

1. **Build the image**
   ```bash
   docker build -t mern-skeleton .
   ```

2. **Run the container**
   ```bash
   docker run \
     --env-file .env.local \
     -p 3000:3000 \
     mern-skeleton
   ```

---

## 6. Enabling shadcn/ui 🎨

shadcn/ui is not pre-installed, but the project is configured to work
smoothly with it (Vite + TS + Tailwind).

1. **Install shadcn CLI (per project)**
   ```bash
   npx shadcn@latest init
   ```

2. **Follow the prompts**
   - Choose **Vite + React + TypeScript**
   - Use `client/src` as your source directory
   - Use the alias `@/components` when asked for the components path

3. **Add your first component**
   ```bash
   npx shadcn@latest add button
   ```

4. **Use it in your app** (example)
   ```tsx
   import { Button } from '@/components/ui/button'

   export function Example() {
     return <Button>Click me</Button>
   }
   ```

---

## 7. Project structure 🗂️

- `client/`
  - `index.html` – Vite HTML entry
  - `src/`
    - `main.tsx` – React entry point
    - `App.tsx` – Main app shell
    - `index.css` – Tailwind entry
- `server/`
  - `server.ts` – Express API + static file server for production
- `dist/`
  - `server/` – Compiled server output (after `npm run build`)
- `Dockerfile` – Multi-stage app image
- `docker-compose.local.yml` – App + Mongo for local Docker dev
- `tsconfig*.json` – TypeScript configuration
- `eslint.config.mjs` – ESLint flat config
- `.prettierrc` – Prettier config

---

## 8. Common workflows ⚙️

- **Start dev mode (no Docker)**
  ```bash
  npm run dev
  ```

- **Build for production**
  ```bash
  npm run build
  ```

- **Run production build**
  ```bash
  npm start
  ```

- **Run Docker stack locally**
  ```bash
  docker compose -f docker-compose.local.yml up --build
  ```
