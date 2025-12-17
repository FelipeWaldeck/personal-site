# Personal Portfolio Site

A modern, performant portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or 22.x
- pnpm (recommended) or npm

Install pnpm globally if you haven't:
```bash
npm install -g pnpm
```

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd personal-site-1
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

The site will open automatically at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### Development
- `pnpm dev` - Start development server with hot reload
- `pnpm preview` - Preview production build locally

### Building
- `pnpm build` - Build for production (outputs to `dist/`)
- `pnpm build:analyze` - Build and open bundle size analyzer

### Testing
- `pnpm test` - Run tests in watch mode
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm test:run` - Run tests once (CI mode)

### Code Quality
- `pnpm lint` - Check for linting errors
- `pnpm lint:fix` - Auto-fix linting errors
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check if files are formatted

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier
- **PWA**: Vite PWA Plugin (offline support, installable)
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
personal-site-1/
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/         # Reusable components
│   ├── data/              # JSON data files
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── styles/            # CSS files
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   └── index.jsx          # Entry point
├── .env.example           # Environment variables template
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
└── tailwind.config.js     # Tailwind configuration
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

All environment variables must be prefixed with `VITE_` to be exposed to the client.

### PWA Configuration

The site is configured as a Progressive Web App with:
- Offline support via Service Worker
- Installable on mobile and desktop
- Auto-updates when new version is deployed

Configuration is in `vite.config.ts` under the `VitePWA` plugin.

## 🎨 Customization

### Update Personal Information

1. **index.html**: Update meta tags, title, and description
2. **public/manifest.json**: Update app name and description
3. **src/pages/Home.jsx**: Replace name and content
4. **src/components/About.jsx**: Add your bio and profile image
5. **src/data/*.json**: Update with your project data

### Add Images

1. Optimize images before adding (use tools like Squoosh, ImageOptim)
2. Place in `public/` directory
3. Reference with `/image-name.jpg` in components

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Configure build settings:
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

### Netlify

1. Push to GitHub
2. Import project to Netlify
3. Configure build settings:
   - **Build Command**: `pnpm build`
   - **Publish Directory**: `dist`

### GitHub Pages

Add this to `vite.config.ts`:
```ts
export default defineConfig({
  base: '/repo-name/',
  // ... rest of config
})
```

Then use the GitHub Actions workflow or deploy manually.

## 🧪 Testing

Tests are written using Vitest and React Testing Library.

Create test files next to components:
```
Component.jsx
Component.test.jsx
```

Run tests with:
```bash
pnpm test        # Watch mode
pnpm test:ui     # UI mode
pnpm test:run    # CI mode
```

## 📊 Bundle Analysis

Analyze your bundle size:

```bash
pnpm build:analyze
```

This opens an interactive visualization of your bundle in your browser.

## 🔒 Pre-commit Hooks

Husky and lint-staged are configured to run before each commit:
- Auto-format code with Prettier
- Auto-fix ESLint errors
- Prevent commits with errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with modern web technologies and best practices for performance, accessibility, and developer experience.
