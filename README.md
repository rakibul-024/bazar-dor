# BazarDor — Bangladesh Market Prices

**BazarDor (বাজার দর)** helps people check the latest prices of essential products in Bangladesh. Browse products by category, compare market prices, and see which prices are rising or falling—all in one responsive web app.

## Features

- **Daily market prices:** Browse everyday products in clear, easy-to-scan cards.
- **Price movement highlights:** View separate lists of products with rising and falling prices.
- **Categories and sorting:** Explore products by category and sort by price, including Bengali numerals.
- **Product details:** See price summaries and available market-by-market price information.
- **Accounts and profiles:** Sign in or register with email and password, or use configured Google and GitHub sign-in. View your profile and update your name.
- **Responsive experience:** Use the app on mobile, tablet, and desktop, with loading skeletons, friendly not-found pages, and helpful notifications.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) App Router | Application framework and routing |
| [React](https://react.dev/) | Interactive user interface |
| [Tailwind CSS](https://tailwindcss.com/) | Responsive styling |
| [Better Auth](https://www.better-auth.com/) | Authentication and account management |
| [MongoDB](https://www.mongodb.com/) | Authentication data storage |
| BazarDor Products API | Product, category, and market-price data |

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB connection string
- OAuth credentials if you want to enable Google or GitHub sign-in

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URL=your-mongodb-connection-string

# Optional: configure either or both social providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Generate a secret locally with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

For local OAuth development, configure these callback URLs with your providers:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

For deployment, set the environment variables in your hosting provider and update `BETTER_AUTH_URL` and OAuth callback URLs to use your deployed app origin. **Never commit `.env.local` or publish credentials.**

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Commands

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Start the production server (after building)
```

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Homepage and product sections |
| `/categories/[slug]` | Products in a category |
| `/product/[slug]` | Protected product details |
| `/signin` | Sign in |
| `/signup` | Create an account |
| `/profile` | View your profile |
| `/profile/update` | Update your profile name |

---

*Prices are indicative and may change depending on market conditions.*
