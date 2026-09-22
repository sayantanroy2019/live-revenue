This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. If port 3000 is already in use, Next.js picks the next free port and prints it in the terminal.

The root URL redirects to the dashboard at `/live-revenue/<eventId>`.

## Mock data (no backend needed)

With no `NEXT_PUBLIC_API_BASE_URL` set, the app serves built-in mock data from the route handlers under `src/app/liverevenue/`. Edit the figures in `src/mocks/live-revenue-mock.ts`. The date filter scales the totals so you can see it working.

To use the real backend, create `.env.local` with:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-host
```

and restart the dev server. Requests then go to the backend and the mock handlers are bypassed.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
