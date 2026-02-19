Website Link : https://setup-simplified.vercel.app/

# Manual Simplifier

> Transform complex product manuals into clear, beginner-friendly setup guides using AI.

Built by **Kartik Garg** — BTech CSE, 2nd Year, Manipal University Jaipur  
Portfolio project demonstrating real AI integration + frontend engineering.

---

## What Is It?

Product manuals are full of technical jargon, confusing diagrams, and unnecessary fluff. Most people just want to know: **how do I set this thing up?**

Manual Simplifier solves this. Upload any PDF manual, and Claude AI extracts the setup steps, rewrites them in plain English, flags common mistakes, and gives you a clean checklist — in seconds.

---

## Live Demo

Upload a PDF → Get a structured guide with:
- Numbered setup steps (rewritten for beginners)
- Estimated setup time
- Warnings (things that could break your device)
- Common mistakes people make
- Final checklist to verify everything works

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Animations | Framer Motion |
| AI | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| PDF Processing | Browser FileReader API (base64 encoding) |
| Routing | React Router v6 |

---

## How It Works

```
User uploads PDF
      ↓
Browser reads PDF as base64
      ↓
Sent to Claude API with structured prompt
      ↓
Claude extracts + rewrites setup steps
      ↓
JSON response rendered as clean guide
```

No backend. No server. The PDF goes directly from your browser to Anthropic's API.

---

## Getting Started

### Prerequisites
- Node.js 18+
- An Anthropic API key → [console.anthropic.com](https://console.anthropic.com)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/manual-simplifier
cd manual-simplifier
npm install
npm run dev
```

Open `http://localhost:8080`

### Usage

1. Paste your Anthropic API key into the input field
2. Upload a PDF manual (drag & drop or browse)
3. Wait ~10–20 seconds for Claude to process it
4. Your structured setup guide appears below

> **Note:** Your API key is never stored anywhere. It lives only in your browser session and is sent directly to Anthropic — not to any intermediate server.

---

## Deployment (Vercel)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/manual-simplifier
git push -u origin main
```

Then go to [vercel.com](https://vercel.com) → New Project → Import repo.

Vercel auto-detects Vite. No environment variables needed — users supply their own API key at runtime.

---

## Project Structure

```
manual-simplifier/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── hero-bg.jpg
│   ├── components/
│   │   ├── ui/                  # 48 shadcn/ui components
│   │   ├── Footer.tsx
│   │   ├── GuideDisplay.tsx     # Renders the AI-generated guide
│   │   ├── HeroSection.tsx      # Landing hero with parallax
│   │   ├── NavLink.tsx
│   │   ├── PipelineSection.tsx  # "How it works" section
│   │   └── UploadSection.tsx    # PDF upload + Claude API call
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── test/
│   │   ├── example.test.ts
│   │   └── setup.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

---

## API Response Format

Claude returns structured JSON:

```json
{
  "title": "Product Name - Setup Guide",
  "estimated_time": "15-20 minutes",
  "steps": [
    { "step": 1, "instruction": "Unbox the device and locate all components." },
    { "step": 2, "instruction": "Connect the power cable to the rear port." }
  ],
  "warnings": [
    "Do not power on before connecting all cables."
  ],
  "common_mistakes": [
    "Plugging into the wrong port — check the label carefully."
  ],
  "final_checklist": [
    "Power LED is solid green",
    "Device is visible on your network"
  ]
}
```

---

## Scripts

```bash
npm run dev        # Start dev server on localhost:8080
npm run build      # Production build → /dist
npm run preview    # Preview production build
npm run test       # Run tests
npm run lint       # Lint TypeScript files
```

---

## Future Improvements

- [ ] Add OCR support for scanned/image-based PDFs
- [ ] Export guide as PDF or Markdown
- [ ] Support multiple languages
- [ ] Save guide history in localStorage
- [ ] Backend proxy to hide API key from users

---

## License

MIT License © 2026 Kartik Garg
