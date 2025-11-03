## ✨ Signalist: AI-Powered Stock Tracker

Welcome to **Signalist**, the AI-powered modern stock market app built with **Next.js**, **Shadcn**, **Better Auth**, and **Inngest**!

Signalist provides a dynamic, real-time financial platform for both investors and developers. Track real-time prices, set personalized alerts, explore company insights, and manage watchlists. The admin dashboard allows managing stocks, publishing news, and monitoring user activity, while **event-driven workflows** power automated alerts, AI-driven daily digests, earnings notifications, and sentiment analysis.

---

## ⚙️ Tech Stack

### Core Technologies

* **[Next.js](https://nextjs.org/docs)**: A powerful React framework for building full-stack web applications, providing server-side rendering and API routes for an optimized experience.
* **[TypeScript](https://www.typescriptlang.org/)**: A statically typed superset of JavaScript that improves code quality, tooling, and error detection for large-scale applications.
* **[Shadcn](https://ui.shadcn.com/docs)** & **[TailwindCSS](https://tailwindcss.com/)**: Used for building a fully customizable, accessible, and responsive user interface.

### Data & Backend

* **[MongoDB](https://www.mongodb.com/)**: A flexible, high-performance NoSQL database for storing data in JSON-like documents.
* **[Finnhub](https://finnhub.io/)**: A real-time financial data API that provides stock, forex, and cryptocurrency market data, crucial for tracking prices and insights.
* **[Nodemailer](https://nodemailer.com/)**: A Node.js library for easily sending transactional emails, notifications, and alerts.

### Automation & Workflows

* **[Inngest](https://www.inngest.com/)**: A platform for event-driven workflows and background jobs, used here to build reliable, scalable automated processes like real-time alerts and AI workflows.
* **[Better Auth](https://www.better-auth.com/)**: A framework-agnostic authentication and authorization library that simplifies user authentication with support for email/password, social sign-on, and MFA.

---

## 🔋 Key Features

### Core Tracking & Insights

👉 **Stock Dashboard**: Track real-time stock prices with interactive line and candlestick charts, historical data, and filters by industry or market cap.
👉 **Company Insights**: Explore detailed financial data like PE ratio, EPS, revenue, recent news, filings, analyst ratings, and sentiment scores for informed decisions.
👉 **Powerful Search**: Quickly find the best stocks with an intelligent search system.

### Automation & Alerts

👉 **Watchlist & Alerts**: Create a personalized watchlist, set alert thresholds for price changes or volume spikes, and receive instant email notifications.
👉 **Real-Time Workflows**: Powered by **Inngest**, automate event-driven processes like price updates, alert scheduling, and automated reporting.
👉 **AI-Powered Summaries**: Generate personalized market summaries, daily digests, and earnings report notifications using the Gemini API.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Muhammad-Junaid23/Signalist--stock_tracker_app.git
cd signalist_stock-tracker-app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NODE_ENV='development'
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# FINNHUB
NEXT_PUBLIC_NEXT_PUBLIC_FINNHUB_API_KEY=
FINNHUB_BASE_URL=https://finnhub.io/api/v1

# MONGODB
MONGODB_URI=

# BETTER AUTH
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# GEMINI
GEMINI_API_KEY=

#NODEMAILER
NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=
```

Replace the placeholder values with your real credentials. You can get these by signing up at: [**MongoDB**](https://www.mongodb.com/products/platform/atlas-database), [**Gemini**](https://aistudio.google.com/prompts/new_chat?utm_source=chatgpt.com), [**Inngest**](https://jsm.dev/stocks-inggest), [**Finnhub**](https://finnhub.io).

**Running the Project**

```bash
npm run dev
npx inngest-cli@latest dev
```
