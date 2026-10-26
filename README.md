# বাজার দর | BazarDor

বাজার দর একটি responsive বাজারদর অ্যাপ, যেখানে বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, বাজারভেদে মূল্য এবং দামের পরিবর্তন এক জায়গায় দেখা যায়।

## Technologies

- Next.js App Router
- React
- JavaScript
- Tailwind CSS
- Better Auth
- MongoDB
- BazarDor Products API

## Key features

1. **আজকের বাজারদর:** চাল, ডাল, সবজি, মাছ, মাংসসহ বিভিন্ন পণ্যের দাম responsive card-এ দেখায়।
2. **দাম পরিবর্তন:** আজ দাম বেড়েছে ও কমেছে—এমন পণ্যের আলাদা তালিকা এবং পরিবর্তনের badge।
3. **ক্যাটাগরি ও sorting:** ক্যাটাগরির পণ্য দেখা এবং বাংলা অঙ্কসহ দাম কম বা বেশি অনুযায়ী সাজানো।
4. **পণ্যের বিস্তারিত:** সর্বনিম্ন, সর্বোচ্চ ও গড় দামের সারাংশ এবং বাজারভিত্তিক আজকের দাম।
5. **অ্যাকাউন্ট ও প্রোফাইল:** Better Auth দিয়ে email/password ও Google/GitHub sign-in, registration এবং প্রোফাইলের নাম আপডেট।

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and configure:
   - `BETTER_AUTH_SECRET`: a unique secret; generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`.
   - `BETTER_AUTH_URL`: the app origin, for example `http://localhost:3000`.
   - `BETTER_AUTH_DB_URL`: a MongoDB connection string.
   - Google and/or GitHub OAuth client ID and secret.

   Register the OAuth callback URLs as `http://localhost:3000/api/auth/callback/google` and `http://localhost:3000/api/auth/callback/github`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000). Authentication pages are available at `/signin` and `/signup`.

Never commit `.env.local` or publish authentication credentials.
