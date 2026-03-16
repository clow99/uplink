# Uplink — ISP Support Assistant

AI-powered troubleshooting for internet, Wi-Fi, modem, router, and connectivity issues. Uplink acts as a customer-facing support agent backed by a knowledge base and (in future phases) live account and outage tools.

## Quick start

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ with the [pgvector](https://github.com/pgvector/pgvector) extension
- An OpenAI API key

### 1. Clone and install

```bash
git clone <repo-url> uplink
cd uplink
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in:

- `DATABASE_URL` — your Postgres connection string
- `OPENAI_API_KEY` — your OpenAI API key
- `NEXTAUTH_SECRET` — a random string (generate with `openssl rand -base64 32`)

### 3. Set up the database

Make sure pgvector is installed in your Postgres instance:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

Then run Prisma migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Ingest the knowledge base

```bash
npm run ingest
```

This reads all Markdown articles from `knowledge/`, embeds them via OpenAI, and stores them in PostgreSQL with vector embeddings for semantic search.

### 5. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create an account on the login page, then start chatting.

## Project structure

```
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   ├── components/       # React components (chat UI, shadcn primitives)
│   ├── lib/
│   │   ├── ai/           # OpenAI client, prompt builder, response parser
│   │   └── tools/        # Tool registry and search_knowledge implementation
│   └── types/            # TypeScript type definitions
├── prisma/               # Database schema and migrations
├── scripts/              # CLI utilities (knowledge ingestion)
├── knowledge/            # Knowledge base articles (Markdown with YAML frontmatter)
├── prompts/              # System prompt for the AI agent
├── schemas/              # JSON Schema for structured responses
├── docs/                 # Tool contract specifications
└── evals/                # Evaluation test cases
```

## Architecture

The chat flow works as follows:

1. User sends a message via the chat widget
2. `POST /api/chat` authenticates the session and loads conversation history
3. The `search_knowledge` tool runs a pgvector semantic search for relevant articles
4. The system prompt, retrieved docs, history, and user message are sent to OpenAI
5. The model returns a structured JSON response matching the `SupportResponse` schema
6. The response is stored in Postgres and the customer-facing text is returned to the UI

## Modes

The agent supports three output modes (Phase 1 uses `customer` only):

| Mode | Output |
|------|--------|
| `customer` | Short, friendly troubleshooting text for end users |
| `copilot` | Internal diagnosis notes for support staff |
| `hybrid` | Both customer text and internal analysis |

The backend always produces the full structured response internally. The mode controls which fields are surfaced to the UI.

## Knowledge base

Articles live in `knowledge/` organized by category:

- `concepts/` — explainers (modem vs router, Wi-Fi bands, etc.)
- `symptoms/` — symptom-to-cause mapping articles
- `devices/` — equipment-specific guides and light status references
- `policies/` — internal process docs (escalation rules, dispatch conditions)
- `flows/` — step-by-step troubleshooting runbooks

Each article uses YAML frontmatter with metadata fields defined in `knowledge/TAXONOMY.md`. After adding or editing articles, re-run `npm run ingest` to update embeddings.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run ingest` | Embed and ingest knowledge articles into Postgres |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio (database browser) |

## Roadmap

- **Phase 1** (current): Knowledge retrieval + customer chat
- **Phase 2**: Live tools (outage check, account lookup) + copilot mode
- **Phase 3**: Ticket creation, escalation, analytics dashboards
- **Phase 4**: Eval automation, failed conversation review, continuous improvement
