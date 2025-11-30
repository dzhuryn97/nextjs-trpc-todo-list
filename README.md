# Todo List with tRPC

Pet project to learn tRPC - a Todo list application with registration and authentication.

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.dist .env

# Set up database
npx prisma migrate dev
npx prisma generate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

Next.js 16, React 19, TypeScript, tRPC 11, Prisma, SQLite, Tailwind CSS 4
