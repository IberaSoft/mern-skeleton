import React, { useEffect, useState } from 'react'

export type UsersDemoProps = {
  apiBaseUrl: string
}

export type User = {
  id: string
  name: string
  email: string
}

export const UsersDemo: React.FC<UsersDemoProps> = ({ apiBaseUrl }) => {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`${apiBaseUrl}/api/users`)
        if (!res.ok) {
          throw new Error('Failed to fetch users')
        }

        const data = (await res.json()) as User[]
        setUsers(data)
      } catch (err) {
        console.error(err)
        setError('Could not load users. Check API and database connection.')
      } finally {
        setLoading(false)
      }
    }

    void fetchUsers()
  }, [apiBaseUrl])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    if (!name || !email) return

    try {
      setSubmitting(true)
      setError(null)

      const res = await fetch(`${apiBaseUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      if (!res.ok) {
        throw new Error('Failed to create user')
      }

      const created = (await res.json()) as User
      setUsers((prev) => [created, ...prev])
      setName('')
      setEmail('')
    } catch (err) {
      console.error(err)
      setError('Could not create user. Check API and database connection.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-6 w-full max-w-lg rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm">
      <h2 className="mb-2 text-base font-semibold text-slate-100">Users demo</h2>
      <p className="mb-4 text-xs text-slate-400">
        This section uses the Express API and MongoDB collection <code>users</code> to show a
        minimal MERN data flow.
      </p>

      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-300" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Ada Lovelace"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-300" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="ada@example.com"
          />
        </div>
        <button
          type="submit"
          disabled={submitting || !name || !email}
          className="mt-2 inline-flex items-center justify-center rounded bg-sky-600 px-3 py-1 text-xs font-medium text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Creating…' : 'Create user'}
        </button>
      </form>

      {error ? (
        <p className="mb-2 text-xs text-red-400">{error}</p>
      ) : (
        <p className="mb-2 text-xs text-slate-400">
          {loading ? 'Loading users…' : `Loaded ${users.length} users.`}
        </p>
      )}

      <ul className="max-h-48 space-y-1 overflow-auto rounded border border-slate-800 bg-slate-950/60 p-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between rounded bg-slate-900/80 px-2 py-1 text-xs text-slate-100"
          >
            <span className="font-medium">{user.name}</span>
            <span className="ml-2 truncate text-[10px] text-slate-400">{user.email}</span>
          </li>
        ))}
        {!loading && users.length === 0 && (
          <li className="py-1 text-center text-[11px] text-slate-500">
            No users yet. Create one with the form above.
          </li>
        )}
      </ul>
    </section>
  )
}
