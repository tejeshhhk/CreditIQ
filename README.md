# Smart AI Credit Score Tracker

A fully-functional, AI-powered web application that helps users track their credit score, analyze spending patterns, and get personalized financial recommendations powered by Groq's fast LLM inference.

## 🚀 Features

- **Real-Time Credit Score Tracking**: Monitor your credit score (300-850) with detailed ratings
- **AI-Powered Financial Advisor**: Chat with an AI that provides personalized credit improvement tips using Groq's llama-3.1-8b-instant model
- **Expense Tracker**: Categorize and track expenses with beautiful visualizations
- **Financial Analytics**: View detailed charts and projections for your financial health
- **Secure Authentication**: Email/password authentication with localStorage persistence
- **Responsive Design**: Mobile-first, modern fintech UI with glassmorphism effects
- **Dark Mode**: Professional dark theme optimized for financial dashboards

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

- Node.js 18+ and pnpm
- Groq API Key (get one free at https://console.groq.com)

## 🔧 Installation & Setup

### 1. Clone and Install

```bash
git clone <repo-url>
cd v0-project
pnpm install
```

### 2. Set Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Groq API key:

```
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Run Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

### 4. Demo Account

Use these credentials to test:
- **Email**: demo@example.com
- **Password**: demo123

Or create a new account!

## 📱 Pages & Features

### Landing Page (`/`)
- Hero section with features overview
- Call-to-action buttons
- Feature highlights

### Authentication
- **Login** (`/login`) - Sign in with email/password
- **Signup** (`/signup`) - Create new account
- Demo credentials provided for quick testing

### Dashboard (`/dashboard`)
- Credit score card with color-coded ratings
- Key metrics (savings, payment consistency, credit utilization)
- Monthly expenses and total debt overview
- AI insights and recommendations
- Quick action cards

### AI Advisor (`/advisor`)
- Interactive chat with AI financial advisor
- Groq-powered real-time responses
- Financial context awareness
- Suggested quick prompts

### Expense Tracker (`/expenses`)
- Add/delete expenses by category
- Pie charts and bar charts for visualization
- Category breakdown
- Recent transactions list
- Budget tracking

### Analytics (`/analytics`)
- Credit score progression chart
- Credit utilization trend analysis
- Weekly spending vs budget
- Debt reduction projections
- Key financial insights

### Settings (`/settings`)
- Account information display
- Notification preferences
- Security settings
- About section

## 🤖 AI Features

The app uses **Groq's llama-3.1-8b-instant** model for:
- Personalized credit improvement advice
- Budgeting recommendations
- Debt reduction strategies
- Financial habit analysis
- Real-time financial guidance

## 💾 Data & Storage

- **User Data**: Stored in localStorage (email, hashed password, profile)
- **Financial Data**: Mock data generated based on user profile
- **Session**: Persistent session management via localStorage

## 📊 Credit Score Calculation

Scores (300-850) are calculated based on:
- **Payment Consistency** (35%): 98% = excellent score contribution
- **Credit Utilization** (30%): Lower is better (target < 30%)
- **Savings Ratio** (20%): % of monthly income saved
- **Debt-to-Income Ratio** (15%): Lower debt relative to income

## 🎨 Design System

Modern fintech aesthetic with:
- **Primary Color**: Indigo (#6366f1)
- **Accent Color**: Violet (#a78bfa)
- **Background**: Dark navy (#0a0e27)
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Smooth Animations**: Framer Motion effects

## 🚀 Deployment

### Deploy to Vercel

```bash
git push origin main
```

Then connect your GitHub repository to Vercel:

1. Go to vercel.com
2. Connect your GitHub repo
3. Add environment variables:
   - `GROQ_API_KEY`: Your Groq API key
4. Deploy!

## 📝 Environment Variables

Required for production:
- `GROQ_API_KEY`: Groq API key for AI features

Optional:
- `NODE_ENV`: Set to 'production' for production builds

## ⚠️ Important Notes

### Security (Demo Project)
- Passwords are stored in localStorage (plaintext for demo)
- **NOT for production use** - implement proper hashing and secure storage
- In production, use bcrypt for password hashing and secure sessions

### API Limitations
- Groq API has rate limits on free tier
- Demo data is randomly generated, not real financial data
- No real banking integration

### Browser Requirements
- Modern browsers with localStorage support
- JavaScript enabled
- Recommended: Chrome, Firefox, Safari, Edge

## 📚 Project Structure

```
app/
├── layout.tsx                 # Root layout with AuthProvider
├── page.tsx                   # Landing page
├── login/page.tsx            # Login page
├── signup/page.tsx           # Signup page
├── dashboard/page.tsx        # Main dashboard
├── advisor/page.tsx          # AI advisor chat
├── expenses/page.tsx         # Expense tracker
├── analytics/page.tsx        # Analytics dashboard
├── settings/page.tsx         # User settings
├── api/
│   └── ai-advice/route.ts   # Groq API integration
└── globals.css               # Design tokens

components/
├── header.tsx               # Main navigation header
├── protected-layout.tsx     # Auth protected wrapper
├── credit-score-card.tsx   # Score display component
└── metric-card.tsx         # Metric cards component

lib/
├── auth-context.tsx        # Authentication context
├── financial-utils.ts      # Financial calculations
└── groq-client.ts          # Groq API client
```

## 🔐 Security Best Practices (For Production)

1. Use proper database (Supabase, Neon, etc.)
2. Hash passwords with bcrypt
3. Implement proper session management
4. Add rate limiting
5. Use HTTPS only
6. Implement CSRF protection
7. Add input validation/sanitization
8. Use secure cookies (httpOnly, secure, sameSite)

## 📞 Support

For issues or questions:
1. Check the Groq API documentation: https://console.groq.com/docs
2. Review Vercel docs: https://vercel.com/docs
3. Check Next.js documentation: https://nextjs.org/docs

## 📄 License

This project is created as a college AI project and is free to use for educational purposes.

## 🎓 Built For

- College AI projects
- Hackathons
- Portfolio showcases
- Learning modern web development
- Understanding AI integration with web apps

---

**Created with ❤️ using Next.js, React, and Groq AI**

Perfect for demonstration, portfolio, and educational purposes!
