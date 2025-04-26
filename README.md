# 🧞 Genie

> Your **Unified AI Assistant** for smarter conversations with multiple AI models.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel)](https://trygenie.xyz)  
[![Last Commit](https://img.shields.io/github/last-commit/tushargr0ver/genie?style=flat-square)](https://github.com/tushargr0ver/genie/commits/main)

---

## ✨ Overview

**Genie** is a **powerful, open-source AI assistant chatbot** that connects you with **multiple LLMs** (Large Language Models) — all in one place.  
Built with **Next.js 14**, **NeonDB**, **TypeScript**, and **Vercel AI SDK**, it delivers a **mobile-responsive**, **dark mode**-friendly, **unified AI interface** that scales.

🔗 **Live Demo**: [trygenie.xyz](https://trygenie.xyz)

---

## 🔥 Features

- 🔥 **Unified AI Interface**: Access **OpenRouter**, **OpenAI**, and **Gemini** APIs seamlessly.
- 📱 **Mobile Responsive**: Fully optimized for phones, tablets, and desktops.
- 🌑 **Dark Mode**: Smooth, native dark mode UI.
- ⚡ **Advanced Reasoning**: Intelligent, deep conversation flows.
- 🔎 **Real-Time Search**: Find conversations instantly.
- 🔐 **Secure OAuth**: Sign in with **Google** or **GitHub** (via **NextAuth**).
- 🎯 **Credit-Based System**: 10 Free Credits + Earn More Through Rewards.
- 🛡️ **MIT Licensed**: Use, modify, and distribute freely.
- 💻 **Markdown Rendering**: Support for different programming languages and styling in chat.
- 🧠 **Improved Prompting**: Fine-tuning the prompt system for enhanced performance and user experience.

---

## 🧠 Available AI Models

- GPT 3.5 Turbo
- GPT 4o Mini
- GPT 4.1 Nano
- GPT 4.1 Mini
- o1 Mini
- o3 Mini
- o4 Mini
- Gemini 2.5 Pro
- Gemini 2.0 Flash / Flash Lite
- Gemini 1.5 Flash / Flash 8B
- Gemini 1.5 Pro
- Meta Llama 4 Scout
- Meta Llama 4 Maverick
- Meta Llama 3.3 70B Instruct
- Qwen2.5 Coder 32B Instruct
- DeepSeek V3

_(More models added regularly!)_

---

## ⚙️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Database**: [NeonDB](https://neon.tech/)
- **Authentication**: [NextAuth (Auth.js)](https://authjs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.dev/)
- **Language**: TypeScript
- **AI SDK**: [Vercel AI SDK](https://vercel.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Installation & Local Setup

Follow these simple steps to run **Genie** locally:

### 1. Clone the repository

```bash
git clone https://github.com/tushargr0ver/genie.git
```

### 2. Move into the project folder

```bash
cd genie
```

### 3. Install dependencies

```bash
npm install
```
> (or use `npm install` / `yarn install`)

### 4. Set up environment variables

Create a `.env.local` file:

```bash
touch .env.local
```

Add the following:

```env
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_oauth_id
AUTH_GOOGLE_SECRET=your_google_oauth_secret
DATABASE_URL=your_database_connection_url
OPENAI_API_KEY=your_openai_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_genai_api_key
AUTH_GITHUB_ID=your_github_oauth_id
AUTH_GITHUB_SECRET=your_github_oauth_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 5. Run the development server

```bash
npm run dev
```

Go to [http://localhost:3000](http://localhost:3000) 🚀

---

## 🎯 Credit System

- **1 Credit** = **1 Message** to any LLM.
- **Free Bonus**: 10 Credits on Signup.
- **Earn More**: Complete small tasks like:
  - ⭐ Follow on GitHub
  - 🤝 Connect on LinkedIn
  - 🐦 Follow on X (Twitter)
  - 📢 Share Genie with friends
- _(Each task gives +5 credits — one-time per user.)_

---

## 🛣️ Roadmap

- 💳 Add payments to buy credits.
- 🗂️ Create multiple "New Chats."
- 📸 Improve multimedia (images, documents, etc).
- 🧠 Smarter search and better reasoning.
- 🚀 Add even more AI models.

---

## 🤝 Contributing

We welcome contributions! 🚀

- Fork the repository.
- Create a new branch (`git checkout -b feature/yourFeature`).
- Commit your changes (`git commit -m 'Add your feature'`).
- Push to the branch (`git push origin feature/yourFeature`).
- Open a **Pull Request**.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
**Genie is fully open-source. Build with it, fork it, improve it. 🌟**

---

## 🙌 Connect with the Creator

Made with ❤️ by [**Tushar Grover**](https://github.com/tushargr0ver)

---

# 🚀 [Launch Genie → trygenie.xyz](https://trygenie.xyz)