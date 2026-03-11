# UPOU Vimeo Strategic Evaluation Site (Next.js)

Next.js App Router implementation of the Vimeo strategic evaluation presentation for UP Open University.

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build and Run Production Locally

```bash
npm run build
npm run start
```

## Deploy to Vercel

### Option 1: Vercel Dashboard (recommended)
1. Push this project to a GitHub repository.
2. In Vercel, click **Add New Project** and import the repository.
3. Framework preset should auto-detect as **Next.js**.
4. Deploy.

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```

The project already includes `vercel.json` for basic response security headers.
