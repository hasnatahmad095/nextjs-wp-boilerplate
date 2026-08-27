# Next.js WordPress Headless CMS Boilerplate

A modern, production-ready boilerplate for building headless WordPress sites with
Next.js. It connects a Next.js frontend to the **WordPress REST API** using the
**Pages Router** with Static Site Generation (SSG) and Incremental Static
Regeneration (ISR).

## ✨ Features

- **Next.js 16** (Pages Router) with Turbopack
- **React 19**
- **Tailwind CSS 4** — CSS-first config, no `tailwind.config.js` needed
- **WordPress REST API** — clean, centralized client (`src/lib/wordpress.js`)
- **SSG + ISR** — pre-rendered pages that revalidate automatically
- **Custom Post Types** — ready-made `project` and `region` examples with dynamic routes
- **Path aliases** — import from `@/…` (maps to `src/`)
- **Modern tooling** — ESLint 9 (flat config) + Prettier with Tailwind class sorting

## 🚀 Quick Start

### Prerequisites

- **Node.js 20.9 or higher**
- npm (or yarn/pnpm)
- A WordPress install with the REST API enabled

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nextjs-wp-boilerplate.git
   cd nextjs-wp-boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example file and fill in your WordPress URL:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-wordpress-site.com
   ```

4. **Configure WordPress image domains** (optional)

   To use `next/image` with WordPress-hosted media, add your domain(s) to
   `remotePatterns` in `next.config.mjs`:

   ```javascript
   images: {
     remotePatterns: [
       { protocol: "https", hostname: "your-wordpress-site.com" },
     ],
   }
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
nextjs-wp-boilerplate/
├── src/
│   ├── components/      # Shared UI (Layout, and your Header/Footer/etc.)
│   ├── fonts/           # Self-hosted Montserrat fonts
│   ├── lib/
│   │   └── wordpress.js # Centralized WordPress REST API client + helpers
│   ├── pages/           # Next.js Pages Router routes
│   │   ├── _app.js
│   │   ├── index.js     # Home
│   │   ├── projects.js  # Projects list
│   │   ├── projects/[slug].js
│   │   ├── regions.js   # Regions list
│   │   └── regions/[slug].js
│   └── styles/
│       └── globals.css  # Tailwind v4 entry + theme tokens
├── .env.example         # Environment variable template
├── eslint.config.mjs    # ESLint flat config
├── next.config.mjs      # Next.js configuration
├── postcss.config.mjs   # Tailwind v4 PostCSS plugin
└── package.json
```

## 🔌 Fetching data from WordPress

All REST calls go through `src/lib/wordpress.js`, a pre-configured Axios client
pointed at `<NEXT_PUBLIC_API_BASE_URL>/wp-json/wp/v2`. Available helpers:

| Helper                       | Description                                                   |
| ---------------------------- | ------------------------------------------------------------- |
| `getPageById(id)`            | Fetch a single page by numeric ID                             |
| `getEntries(type, params)`   | Fetch a list for any post type (`post`, `page`, `project`, …) |
| `getEntryBySlug(type, slug)` | Fetch one entry of a post type by slug                        |
| `getAllSlugs(type)`          | All slugs for a post type — handy for `getStaticPaths`        |

Example (`getStaticProps`):

```javascript
import { getEntries } from "@/lib/wordpress";

export async function getStaticProps() {
  const projects = await getEntries("project", { per_page: 100 });
  return { props: { projects }, revalidate: 3600 };
}
```

### Page IDs

The example pages read optional WordPress page IDs from the environment
(`NEXT_PUBLIC_HOME_PAGE_ID`, `NEXT_PUBLIC_PROJECTS_PAGE_ID`,
`NEXT_PUBLIC_REGIONS_PAGE_ID`). Set them in `.env.local`, or edit the fallback
constants at the top of each page file.

## 🎨 Styling (Tailwind CSS 4)

Tailwind v4 is configured entirely in CSS. Theme tokens live in the `@theme`
block of `src/styles/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-theme-pink: #ec145b; /* → bg-theme-pink, text-theme-pink, … */
  --font-montserrat: "Montserrat", ui-sans-serif, system-ui, sans-serif;
}
```

There is no `tailwind.config.js` and no `autoprefixer` — Tailwind v4 handles
content detection and vendor prefixing automatically.

## 🧩 WordPress Setup

WordPress REST API is enabled by default in WordPress 4.7+. See
[`WORDPRESS_SETUP.md`](WORDPRESS_SETUP.md) for optional `functions.php` snippets:

- ACF fields with image URLs and alt text in REST responses
- A featured-image URL field (`fimg_url`)
- Auto-deploy webhooks for Vercel / Netlify

Custom post types must be registered with `'show_in_rest' => true` to appear in
the REST API.

## 📦 Tech Stack

| Package      | Version         |
| ------------ | --------------- |
| Next.js      | 16              |
| React        | 19              |
| Tailwind CSS | 4               |
| Axios        | 1.x             |
| Swiper       | 14              |
| React Icons  | 5.x             |
| ESLint       | 9 (flat config) |
| Prettier     | 3.x             |

> `swiper` and `react-icons` are included as conveniences and are not yet used
> by the example pages — import them where you need them, or remove them.

## 🛠️ Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — start the production server
- `npm run lint` — run ESLint
- `npm run format` — format with Prettier (sorts Tailwind classes)

## 🌐 Deployment

### Vercel (recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add the `NEXT_PUBLIC_API_BASE_URL` environment variable
4. Deploy

### Other platforms

Deploys anywhere Next.js runs — Netlify, AWS Amplify, DigitalOcean App Platform,
Railway, or any Node.js host.

## 🤝 Contributing

Contributions are welcome — feel free to open an issue or a pull request.

## 📄 License

Released under the [MIT License](LICENSE).

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Made with ❤️ for the Headless WordPress community.
