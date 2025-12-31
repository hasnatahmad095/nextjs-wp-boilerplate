# Next.js WordPress Headless CMS Boilerplate

A modern, production-ready boilerplate for building headless WordPress websites with Next.js. This boilerplate provides a solid foundation for connecting Next.js frontend with WordPress REST API as a headless CMS.

## ✨ Features

- **Next.js 14** - Latest Next.js with App Router support
- **WordPress REST API** - Seamless integration with WordPress headless CMS
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Static Site Generation (SSG)** - Pre-rendered pages for optimal performance
- **Incremental Static Regeneration (ISR)** - Automatic content updates
- **TypeScript Ready** - Easy to migrate to TypeScript if needed
- **Modern Tooling** - ESLint, Prettier, and more configured
- **Custom Post Types Support** - Ready for projects, regions, and custom content types
- **Dynamic Routes** - Built-in support for dynamic pages and slugs

## 🚀 Quick Start

### Prerequisites

- Node.js 20.18.1 or higher
- npm or yarn
- WordPress installation with REST API enabled

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

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-wordpress-site.com
```

4. **Configure WordPress image domains** (optional)

Edit `next.config.mjs` and add your WordPress domain to the `images.domains` array:

```javascript
images: {
  domains: ['your-wordpress-site.com']
}
```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
nextjs-wp-boilerplate/
├── src/
│   ├── fonts/          # Custom fonts
│   ├── pages/          # Next.js pages
│   │   ├── projects/   # Project pages
│   │   └── regions/    # Region pages
│   └── styles/         # Global styles
├── public/             # Static assets
├── next.config.mjs     # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Dependencies
```

## 🔧 Configuration

### WordPress Setup

1. **Enable REST API** - WordPress REST API is enabled by default in WordPress 4.7+

2. **Install WordPress Functions** - See `WORDPRESS_SETUP.md` for WordPress functions to add to your theme's `functions.php`:
   - ACF fields support in REST API
   - Featured image URL endpoint
   - Auto-deployment hooks (optional)

3. **Custom Post Types** - The boilerplate includes examples for:
   - `project` - Custom post type for projects
   - `region` - Custom post type for regions

### Page Configuration

Update the page IDs in your page files to match your WordPress pages:

- `src/pages/index.js` - Home page ID
- `src/pages/projects.js` - Projects page ID
- `src/pages/regions.js` - Regions page ID

Replace hardcoded IDs with environment variables or configuration constants.

## 📦 Tech Stack

- **Framework:** Next.js 14.1.0
- **React:** 18.3.1
- **Styling:** Tailwind CSS 3.4.18
- **HTTP Client:** Axios 1.13.2
- **Icons:** React Icons 5.5.0
- **Animations:** AOS 2.3.4
- **Sliders:** Swiper 11.2.10
- **Code Quality:** ESLint, Prettier

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

This boilerplate can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Or any Node.js hosting

## 📝 WordPress Functions

See `WORDPRESS_SETUP.md` for WordPress functions that enhance the REST API:
- ACF fields integration
- Featured image URLs
- Alt text support for images
- Auto-deployment hooks (optional)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [WordPress](https://wordpress.org/) - The world's most popular CMS
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Swiper](https://swiperjs.com/) - Modern touch slider

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Made with ❤️ for the Headless WordPress Community
