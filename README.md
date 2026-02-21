# CogniFlow — Workflow Automation Platform

A full-stack workflow automation platform with a drag-and-drop editor, multi-trigger support, AI-assisted workflow generation, and background job orchestration.

## Features

- **Visual Workflow Editor** — Drag-and-drop canvas built with React Flow for creating and connecting workflow nodes
- **AI Workflow Generator** — Describe an automation in natural language and get a draft workflow generated using an AI Agent, rendered directly on the canvas
- **Multi-Trigger Support** — Manual triggers, Google Form submissions, and RazorPay payment events
- **Action Nodes** — HTTP requests, OpenAI/Anthropic/Gemini text generation, Slack and Discord messaging
- **Background Job Orchestration** — Workflow execution powered by Inngest with real-time status updates
- **SaaS Billing & Paywalls** — Subscription management via Polar Payments
- **Secure Authentication** — GitHub and Google OAuth via Better Auth
- **Type-Safe Backend** — End-to-end type safety with tRPC, Prisma, and Zod validation
- **Error Monitoring** — Integrated Sentry for observability and diagnostics

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| API | tRPC |
| State | Jotai, TanStack React Query |
| Canvas | React Flow (`@xyflow/react`) |
| AI | Vercel AI SDK (`@ai-sdk/google`, `@ai-sdk/openai`, `@ai-sdk/anthropic`) |
| Jobs | Inngest |
| Auth | Better Auth |
| Payments | Polar SDK |
| Styling | Tailwind CSS, shadcn/ui |
| Monitoring | Sentry |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Setup

1. Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd cogniflow
npm install
```

2. Copy `.env.example` to `.env` and fill in your credentials:

```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="..."
GOOGLE_GENERATIVE_AI_API_KEY="..."
```

3. Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:

```bash
npm run dev
```

5. In a separate terminal, start the Inngest dev server:

```bash
npx inngest-cli@latest dev
```
## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:studio` | Open Prisma Studio |
| `npm run lint` | Run ESLint |

## AI Workflow Generator

The AI Workflow Generator lets you describe an automation in plain English and generates a draft workflow:

1. Open any workflow in the editor
2. Use the input bar in the top-left corner of the canvas
3. Describe your automation (e.g., *"When a form is submitted, call Gemini and send the result to Slack"*)
4. Click **Generate Workflow** — nodes and edges appear on the canvas
5. Review and edit the draft before saving or executing

**Supported node types:** Manual Trigger, Google Form Trigger, RazorPay Trigger, HTTP Request, OpenAI, Anthropic, Gemini, Discord, Slack
