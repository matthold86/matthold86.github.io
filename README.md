# Matthew Holden - Personal Website

A modern personal website built with Next.js, featuring a clean design and plans for project showcases, blog posts, and an AI chatbot.

🌐 **Live Website**: [matthold86.github.io](https://matthold86.github.io)

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages via GitHub Actions
- **Build**: Static export for optimal performance

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx          # Homepage
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/            # Reusable components (to be added)
├── lib/                  # Utility functions (to be added)
└── types/                # TypeScript types (to be added)
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and prepare for deployment

## 🚀 Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions. The workflow:

1. Triggers on pushes to `main` branch
2. Builds the Next.js app with static export
3. Deploys to GitHub Pages

### Manual Deployment
If you need to deploy manually:
```bash
npm run deploy
```

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] Next.js setup with TypeScript
- [x] Tailwind CSS styling
- [x] Basic homepage
- [x] GitHub Actions deployment

### Phase 2: Content & Structure
- [ ] Project showcase pages
- [ ] Blog system for Medium articles
- [ ] Resume page
- [ ] Navigation and routing

### Phase 3: Advanced Features
- [ ] AI chatbot integration
- [ ] Testing infrastructure
- [ ] Performance optimization
- [ ] SEO improvements

## 🔧 Configuration

### Next.js Config
- **Static Export**: Enabled for GitHub Pages compatibility
- **Base Path**: Configured for `matthold86.github.io`
- **Image Optimization**: Disabled for static export

### GitHub Pages
- **Source**: GitHub Actions
- **Branch**: `gh-pages` (auto-generated)
- **Custom Domain**: None (using default `matthold86.github.io`)

## 📝 Contributing

This is a personal website, but if you have suggestions or find issues:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and Tailwind CSS
