# Smart AI Credit Score Tracker

A fully-functional, AI-powered web application that helps users track their credit score, analyze spending patterns, and get personalized financial recommendations powered by Groq's fast LLM inference.

## 🚀 Features

- **Onboarding Flow**: New users provide their financial details (salary, EMIs, debt) for a personalized analysis.
- **Real-Time Credit Score Tracking**: Monitor your credit score (300-900) with detailed ratings based on your own data.
- **AI-Powered Financial Advisor**: Chat with an AI that provides personalized credit improvement tips using Groq's llama-3.1-8b-instant model.
- **Expense Tracker**: Categorize and track expenses with beautiful visualizations.
- **Financial Analytics**: View detailed charts and projections for your financial health.
- **Secure Authentication**: Email/password authentication with localStorage persistence.
- **Responsive Design**: Mobile-first, modern fintech UI with glassmorphism effects.
- **Dark Mode**: Professional dark theme optimized for financial dashboards.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui (pre-installed)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **AI**: Groq API (llama-3.1-8b-instant)
- **Icons**: Lucide React
- **Database**: localStorage (for demo) + mock data generation

## 📋 Prerequisites

- Node.js 18+
- Groq API Key (get one free at https://console.groq.com)

## 🔧 Installation & Setup

### 1. Clone and Install

```bash
git clone https://github.com/tejeshhhk/CreditIQ.git
cd CreditIQ
npm install
```

### 2. Set Environment Variables

Create a `.env` file in the root directory:

```
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 📱 Pages & Features

### Landing Page (`/`)
- Hero section with features overview.

### Authentication
- **Login** (`/login`) - Sign in with email/password.
- **Signup** (`/signup`) - Create new account.

### Onboarding (`/onboarding`)
- Collects salary, EMIs, total debt, and credit limits to build your profile.

### Dashboard (`/dashboard`)
- Credit score card with color-coded ratings.
- Key metrics (savings, payment consistency, credit utilization).
- Monthly expenses and total debt overview.
- AI insights and recommendations.

### AI Advisor (`/advisor`)
- Interactive chat with AI financial advisor.
- Groq-powered real-time responses.

### Expense Tracker (`/expenses`)
- Add/delete expenses by category.
- Pie charts and bar charts for visualization.

### Analytics (`/analytics`)
- Credit score progression chart.
- Debt reduction projections.

### Settings (`/settings`)
- Account information and security settings.

## 🤖 AI Features

The app uses **Groq's llama-3.1-8b-instant** model for:
- Personalized credit improvement advice.
- Budgeting recommendations.
- Debt reduction strategies.

## 📊 Credit Score Calculation

Scores (300-900) are simulated based on:
- **Payment Consistency** (35%)
- **Credit Utilization** (30%): Target < 30%
- **Savings Ratio** (20%)
- **Debt-to-Income Ratio** (15%)

---

**Created with ❤️ using Next.js, React, and Groq AI**
