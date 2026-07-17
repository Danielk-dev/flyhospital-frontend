# ClickHospitals - Next.js Frontend

Next.js App Router conversion of the ClickHospitals Nuxt frontend, with API routes proxying to the Laravel backend.

## Getting Started

```bash
cd flyfrontend
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
flyfrontend/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── api/[...path]/    # API proxy to backend
│   │   ├── page.tsx          # Home
│   │   ├── hospitals/        # Hospital listing & detail
│   │   ├── blogs/            # Blog listing & detail
│   │   ├── auth/             # Auth/partner registration
│   │   └── registration/     # 6-step registration wizard
│   ├── components/           # React components
│   ├── stores/               # Zustand state management
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Config, API client, helpers
└── public/assets/            # CSS, images (from Nuxt project)
```

## API Architecture

All frontend API calls go through `/api/*` routes which proxy to `https://admin.clickhospitals.com/api/*`.

Client usage:
```typescript
import { apiFetch } from '@/lib/api';
const data = await apiFetch('treatments');
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL |
| `NEXT_PUBLIC_IMAGE_URL` | Image CDN base URL |
| `NEXT_PUBLIC_WEB_URL` | Public website URL |
