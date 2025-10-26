# ParcelPoint Kenya

A modern, responsive website for ParcelPoint smart locker service in Kenya. Built with Next.js and deployed as a static site on GitHub Pages with real backend API integration.

## Features

- Real-time locker availability from backend API
- M-PESA payment integration
- Dark mode support
- Mobile-responsive design
- SEO optimized
- Static site generation for GitHub Pages

## Tech Stack

- Next.js 15.3.4
- React 19
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd parcelpointke
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your development API credentials.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend API Integration

This project integrates with the SquaredWS backend API for:
- Real-time device and locker availability
- Booking validation
- M-PESA payment processing


## Deployment

The site is configured for automatic deployment to GitHub Pages.

### GitHub Secrets Setup

Add these secrets in your repository settings:

- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL
- `NEXT_PUBLIC_API_KEY` - API authentication key
- `NEXT_PUBLIC_API_VERSION` - API version (default: v1)

### Deploy

Push to the `main` branch to trigger automatic deployment:

```bash
git push origin main
```


## Project Structure

```
parcelpointke/
├── app/                    # Next.js app directory
│   ├── booking/           # Booking page with API integration
│   └── page.tsx           # Homepage
├── components/            # React components
├── lib/
│   └── api/              # API client and services
│       ├── client.ts     # HTTP client with auth
│       ├── types.ts      # TypeScript types
│       └── services.ts   # API service functions
├── public/               # Static assets
└── .github/
    └── workflows/        # GitHub Actions CI/CD
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License

All rights reserved - ParcelPoint Kenya

## Support

For issues or questions, contact: hello@squared.co.ke
