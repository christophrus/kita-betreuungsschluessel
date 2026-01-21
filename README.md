# Kita Betreuungsschlüssel

A React + Vite PWA with Tailwind CSS, configured for GitHub Pages deployment.

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **PWA Support** - Progressive Web App capabilities with offline support
- 🚀 **GitHub Pages** - Automated deployment workflow

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/kita-betreuungsschluessel/`

### Building for Production

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Deployment to GitHub Pages

Deploy to GitHub Pages:

```bash
npm run deploy
```

This will build the project and push the `dist` folder to the `gh-pages` branch.

## Project Structure

```
kita-betreuungsschluessel/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── App.jsx         # Main App component
│   ├── index.css       # Global styles (Tailwind)
│   └── main.jsx        # Entry point
├── .github/
│   └── copilot-instructions.md
├── index.html
├── package.json
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration with PWA
```

## Configuration

### PWA Configuration

The PWA is configured in [vite.config.js](vite.config.js) using `vite-plugin-pwa`:

- Auto-update strategy
- Service worker generation
- Web app manifest with icons

**Note:** Add your PWA icons (`pwa-192x192.png` and `pwa-512x512.png`) to the `public` folder.

### GitHub Pages

The base URL is set to `/kita-betreuungsschluessel/` in [vite.config.js](vite.config.js). Update this if your repository name is different.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Technologies

- React 19.2.0
- Vite 7.2.4
- Tailwind CSS 4.1.18
- vite-plugin-pwa 1.2.0
- gh-pages 6.3.0

## License

MIT
