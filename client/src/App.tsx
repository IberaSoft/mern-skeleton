import React from 'react'
import { UsersDemo } from './components/UsersDemo'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

const App: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-slate-950 px-4 py-10 text-slate-50">
      <section className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900/60 px-8 py-6 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-semibold tracking-tight">
          MERN Skeleton
        </h1>
        <p className="mb-4 max-w-md text-center text-slate-300">
          React 19 + TypeScript, Vite, Tailwind, shadcn-ready, Dockerized, and
          production-focused. Start building your next idea here.
        </p>
        <p className="mb-2 text-center text-xs text-slate-400">
          API base URL: <span className="font-mono">{apiBaseUrl}</span>
        </p>
        <p className="text-center text-xs text-slate-500">
          Edit <code className="rounded bg-slate-800 px-1 py-0.5">client/src/App.tsx</code>{' '}
          to get started.
        </p>
      </section>

      <UsersDemo apiBaseUrl={apiBaseUrl} />
    </main>
  )
}

export default App
