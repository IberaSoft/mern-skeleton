import path from 'node:path'
import express, { type Request, type Response, type NextFunction } from 'express'
import { MongoClient, type Db, type Collection, ObjectId } from 'mongodb'
import dotenv from 'dotenv'
import fs from 'node:fs'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = Number(process.env.PORT) || 4000
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_skeleton_local'
const MONGODB_DB = process.env.MONGODB_DB || 'mern_skeleton'

let mongoClient: MongoClient | null = null
let db: Db | null = null

export type User = {
  _id?: ObjectId
  name: string
  email: string
}

function getDbOrThrow(): Db {
  if (!db) {
    throw new Error('Database not initialized')
  }
  return db
}

function getUsersCollection(): Collection<User> {
  return getDbOrThrow().collection<User>('users')
}

async function connectToDatabase(): Promise<MongoClient> {
  if (mongoClient && db) return mongoClient

  mongoClient = new MongoClient(MONGODB_URI)
  await mongoClient.connect()
  db = mongoClient.db(MONGODB_DB)
  console.info(`✅ Connected to MongoDB database "${MONGODB_DB}"`)
  return mongoClient
}

app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    await connectToDatabase()
    res.json({ status: 'ok', db: 'connected' })
  } catch (error) {
    console.error('Healthcheck error:', error)
    res.status(500).json({ status: 'error', db: 'disconnected' })
  }
})

// Users API – minimal example
app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    await connectToDatabase()
    const usersCollection = getUsersCollection()
    const users = await usersCollection
      .find({}, { projection: { name: 1, email: 1 } })
      .sort({ _id: -1 })
      .limit(50)
      .toArray()

    const result = users.map((user) => ({
      id: user._id ? user._id.toHexString() : undefined,
      name: user.name,
      email: user.email,
    }))

    res.json(result)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ message: 'Failed to load users' })
  }
})

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body ?? {}

    if (!name || !email || typeof name !== 'string' || typeof email !== 'string') {
      return res.status(400).json({ message: 'name and email are required' })
    }

    await connectToDatabase()
    const usersCollection = getUsersCollection()

    const insertResult = await usersCollection.insertOne({ name, email })

    return res.status(201).json({
      id: insertResult.insertedId.toHexString(),
      name,
      email,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return res.status(500).json({ message: 'Failed to create user' })
  }
})

// Serve Vite-built frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(process.cwd(), 'client', 'dist')
  const indexHtmlPath = path.join(clientDistPath, 'index.html')

  app.use(express.static(clientDistPath))

  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api')) return next()

    if (!fs.existsSync(indexHtmlPath)) {
      return res
        .status(500)
        .send('Frontend build not found. Did you run "npm run build"?')
    }

    res.sendFile(indexHtmlPath)
  })
}

async function start() {
  try {
    await connectToDatabase()

    const server = app.listen(PORT, () => {
      console.info(`🚀 Server started on http://localhost:${PORT}`)
    })

    const shutdown = async () => {
      console.info('Shutting down server...')
      server.close(async () => {
        if (mongoClient) {
          await mongoClient.close()
          console.info('MongoDB connection closed')
        }
        process.exit(0)
      })
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

void start()

