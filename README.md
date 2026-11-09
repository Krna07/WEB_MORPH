# WebMorph — AI-Powered Adaptive Web Interface Platform

> **Interfaces That Reconfigure Around User Intent**

WebMorph is a full-stack MERN application that dynamically restructures its entire UI — layout, navigation, component hierarchy, and information priority — based on what the user wants to accomplish, expressed in plain natural language.

Traditional dashboards have fixed layouts. Users navigate menus and pages to find what they need. WebMorph flips this: the user types a business objective, the AI understands the intent, and the interface reorganizes itself into a task-specific workspace — different components, different navigation, different information hierarchy — all without a page reload.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Environment Variables](#environment-variables)
6. [Running the App](#running-the-app)
7. [Authentication System](#authentication-system)
8. [AI Intent Engine](#ai-intent-engine)
9. [Component Registry (28 Widgets)](#component-registry-28-widgets)
10. [The 5 Business Workflows](#the-5-business-workflows)
11. [Dynamic UI Engine](#dynamic-ui-engine)
12. [Adaptive Navigation](#adaptive-navigation)
13. [Before/After Comparison Panel](#beforeafter-comparison-panel)
14. [Demo Mode](#demo-mode)
15. [Feedback System](#feedback-system)
16. [Layout History](#layout-history)
17. [Personalization](#personalization)
18. [Database Models](#database-models)
19. [API Reference](#api-reference)
20. [Security](#security)
21. [Error Handling](#error-handling)
22. [Deployment](#deployment)

---

## Features

### Core Intelligence
- **Natural language intent detection** — Google Gemini 1.5 Flash API with built-in keyword fallback
- **Structured JSON AI response** — AI returns a validated schema; unknown component keys are stripped before any rendering
- **Zero arbitrary code execution** — AI only selects from a hardcoded component whitelist

### Dynamic Interface
- **Real-time UI transformation** — components added, removed, reordered without page reload
- **Adaptive sidebar navigation** — nav items replaced by task-specific items on every transformation
- **Before/After comparison panel** — slide-in panel showing exactly which components were added, removed, and retained
- **5 predefined business workflows** — each produces a genuinely different interface
- **Framer Motion animations** — every component enter/exit and panel transition is animated

### User System
- **JWT authentication** — register, login, protected routes, 7-day token expiry
- **Persistent sessions** — token and user stored in localStorage, restored on reload
- **Workspace history** — every transformation auto-saved and restorable
- **User feedback** — Helpful / Not Helpful / Customize after each transformation
- **Personalization panel** — pin/hide components, save preferred layouts
- **Light/dark theme** — toggle in top bar, persisted in localStorage and user preferences

### Dashboard
- **12-widget default dashboard** — full analytics overview on login
- **28 reusable widget components** — KPIs, charts, tables, maps, panels
- **Loading skeletons** — animated placeholders during AI processing
- **Error states** — friendly messages with retry on AI or network failure
- **Demo mode** — automated walkthrough cycling 3 workflows then resetting

---

## Tech Stack

| Layer | Library / Tool | Version |
|---|---|---|
| Frontend framework | React | 18 |
| Build tool | Vite | latest |
| Styling | Tailwind CSS | v3 |
| Routing | React Router DOM | v6 |
| Animations | Framer Motion | latest |
| Charts | Recharts | latest |
| Icons | Lucide React | latest |
| HTTP client | Axios | latest |
| Backend framework | Express.js | v4 |
| Runtime | Node.js | 18+ |
| Database | MongoDB + Mongoose | v8 |
| Auth | JWT (jsonwebtoken) + bcryptjs | — |
| Rate limiting | express-rate-limit | v7 |
| AI | @google/generative-ai (Gemini 1.5 Flash) | v0.21 |

---

## Project Structure

```
WebMorph/
├── client/                                  # React + Vite frontend
│   ├── index.html
│   ├── vite.config.js                       # Proxy: /api → http://localhost:5000
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx                         # ReactDOM.createRoot, AuthProvider, BrowserRouter
│       ├── App.jsx                          # Routes: /, /login, /register, /dashboard
│       ├── index.css                        # Tailwind directives + global styles
│       ├── api/
│       │   └── axios.js                     # Axios instance, JWT interceptor, 401 redirect
│       ├── context/
│       │   └── AuthContext.jsx              # AuthProvider: token, user, login(), logout(), isAuthenticated
│       ├── pages/
│       │   └── Dashboard.jsx               # Renders <AdaptiveDashboard />
│       └── components/
│           ├── auth/
│           │   ├── Login.jsx               # Email + password form, calls POST /api/auth/login
│           │   └── Register.jsx            # Name + email + password + confirm, calls POST /api/auth/register
│           ├── common/
│           │   ├── ProtectedRoute.jsx       # Redirects to /login if not authenticated
│           │   ├── ErrorBoundary.jsx        # Class component, catches render errors, reload button
│           │   └── LoadingSkeleton.jsx      # Animated pulse grid placeholders
│           ├── dashboard/
│           │   ├── AdaptiveDashboard.jsx    # Main controller: layout state, demo mode, all panels
│           │   ├── AdaptiveNav.jsx          # Collapsible sidebar, default/task-specific nav items
│           │   ├── BeforeAfterPanel.jsx     # Slide-in diff panel: added/removed/retained counts
│           │   ├── componentRegistry.js    # Imports all 28 widgets, exports registry + defaultLayout
│           │   ├── DashboardLayout.jsx      # Animated grid: renders componentKeys via registry
│           │   └── IntentBar.jsx           # NL input, 5 suggestion chips, Analyze button
│           ├── feedback/
│           │   └── FeedbackWidget.jsx       # Helpful / Not Helpful / Customize, POST /api/feedback
│           ├── history/
│           │   └── LayoutHistory.jsx        # Slide-in panel, GET /api/workspaces, restore on click
│           ├── personalization/
│           │   └── PersonalizationPanel.jsx # Theme toggle, pin/hide components, save preferences
│           └── widgets/                     # 28 analytics components (all use sampleData.js)
│               ├── RevenueCard.jsx
│               ├── OrdersCard.jsx
│               ├── CustomerCard.jsx
│               ├── ConversionCard.jsx
│               ├── RevenueChart.jsx
│               ├── SalesChart.jsx
│               ├── CustomerGrowthChart.jsx
│               ├── TransactionTable.jsx
│               ├── RegionalSalesChart.jsx
│               ├── ProductPerformance.jsx
│               ├── NotificationPanel.jsx
│               ├── MarketingAnalytics.jsx
│               ├── FailureAnalytics.jsx
│               ├── FailedTransactionTable.jsx
│               ├── ErrorDistribution.jsx
│               ├── ResolutionPanel.jsx
│               ├── CustomerSegmentation.jsx
│               ├── ChurnAnalysis.jsx
│               ├── CustomerLifetimeValue.jsx
│               ├── EngagementMetrics.jsx
│               ├── ProductRankingTable.jsx
│               ├── DecliningSalesChart.jsx
│               ├── InventoryStatus.jsx
│               ├── ProfitMarginChart.jsx
│               ├── RegionalMap.jsx
│               ├── CityPerformance.jsx
│               ├── SalesRepPerformance.jsx
│               └── RegionalComparison.jsx
│
├── server/                                  # Node.js + Express backend
│   ├── package.json                         # deps: express, mongoose, jwt, bcryptjs, cors, dotenv, rate-limit, @google/generative-ai
│   ├── .env                                 # Never committed to git
│   └── src/
│       ├── index.js                         # Entry: dotenv, express, cors, route mounts, MongoDB connect
│       ├── middleware/
│       │   └── auth.js                      # verifyToken: reads Bearer token, sets req.userId
│       ├── models/
│       │   ├── User.js                      # email, password (bcrypt pre-save), name, preferences, defaultLayout
│       │   ├── Dashboard.js                 # userId, name, layoutConfig, isDefault
│       │   ├── Workspace.js                 # userId, title, intent, prompt, layoutConfig, timestamp
│       │   └── Interaction.js               # userId, prompt, aiResponse, layoutApplied, feedback, timestamp
│       └── routes/
│           ├── auth.js                      # POST /register, POST /login, GET /me
│           ├── ai.js                        # POST /interpret, POST /generate-layout, POST /transform
│           ├── dashboard.js                 # GET /, PUT /layout
│           ├── workspaces.js                # POST /, GET /, GET /:id, DELETE /:id
│           ├── feedback.js                  # POST /, GET /history
│           └── preferences.js              # GET /, PUT /
│
├── .gitignore
└── README.md
```

---

## Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB (local Community Server or MongoDB Atlas)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Krna07/WEB_MORPH.git
cd WEB_MORPH
```

### 2. Backend setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/webmorph
JWT_SECRET=your_secure_random_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

### 3. Frontend setup

```bash
cd client
npm install
```

No `.env` needed for the frontend. The Vite dev server proxies all `/api` requests to `http://localhost:5000` via `vite.config.js`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Express server port. Defaults to `5000` |
| `MONGO_URI` | Yes | MongoDB connection string. Use `mongodb://localhost:27017/webmorph` for local or your Atlas SRV string |
| `JWT_SECRET` | Yes | Secret key for signing JWTs. Use any long random string |
| `GEMINI_API_KEY` | No | Google Gemini API key. Get one free at [aistudio.google.com](https://aistudio.google.com). If absent the app uses keyword-based fallback |
| `CLIENT_URL` | No | Frontend origin for CORS. Defaults to `http://localhost:5173` |

> API keys are used only server-side. They are never sent to the browser.

---

## Running the App

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev        # nodemon, auto-restarts on file changes
# or
npm start          # plain node, for production
```

Confirm you see:
```
MongoDB connected successfully
WebMorph server running on port 5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Authentication System

**Files:** `server/src/routes/auth.js`, `server/src/models/User.js`, `client/src/context/AuthContext.jsx`, `client/src/components/auth/`

### How it works

1. **Register** (`POST /api/auth/register`) — validates name/email/password, checks for duplicate email, hashes password with bcryptjs (10 salt rounds), creates User, returns JWT + user object.
2. **Login** (`POST /api/auth/login`) — finds user by email, runs `user.comparePassword()` (bcrypt.compare), returns JWT + user object on success.
3. **Token** — JWT signed with `JWT_SECRET`, expires in 7 days. Payload: `{ userId }`.
4. **Client storage** — token stored as `wm_token` in localStorage, user object as `wm_user`.
5. **Axios interceptor** — `client/src/api/axios.js` attaches `Authorization: Bearer <token>` to every request automatically. On 401 response, clears storage and redirects to `/login`.
6. **AuthContext** — React context exposes `token`, `user`, `login()`, `logout()`, `isAuthenticated`. Initialized from localStorage so sessions survive page refresh.
7. **Protected routes** — `ProtectedRoute.jsx` wraps `/dashboard` and redirects unauthenticated users to `/login`.
8. **GET /api/auth/me** — returns the logged-in user's data (password excluded) using `req.userId` set by the auth middleware.

### User model fields

| Field | Type | Notes |
|---|---|---|
| `name` | String | Required, trimmed |
| `email` | String | Required, unique, lowercase |
| `password` | String | bcrypt hashed on save |
| `preferences` | Mixed | theme, pinnedComponents, hiddenComponents |
| `defaultLayout` | [String] | Array of component keys |
| `createdAt` | Date | Auto |

---

## AI Intent Engine

**Files:** `server/src/routes/ai.js`, `client/src/components/dashboard/IntentBar.jsx`

### Flow

```
User types intent in IntentBar
        ↓
POST /api/ai/generate-layout  { prompt }
        ↓
Server calls Gemini 1.5 Flash API
        ↓
Strip markdown code fences from response
        ↓
Extract JSON object with regex
        ↓
Filter visibleComponents + hiddenComponents against COMPONENT_WHITELIST
        ↓
Save Interaction to MongoDB
        ↓
Return layoutConfig to frontend
        ↓
AdaptiveDashboard.applyLayout() updates React state
        ↓
DashboardLayout re-renders with new componentKeys
```

### Gemini prompt

The AI is instructed to return only raw JSON (no markdown) matching this schema, selecting components exclusively from the 28-item whitelist.

### Keyword fallback

If `GEMINI_API_KEY` is absent or the Gemini call fails, the server uses `detectIntent()` — a keyword matching function that maps common words to one of 5 intents and returns the corresponding `FALLBACK_LAYOUTS` entry. This means the app works fully offline from Gemini.

**Keyword mapping:**
| Keywords | Intent |
|---|---|
| transaction, failed, payment, failure | `transaction_investigation` |
| revenue, growth, sales | `revenue_analysis` |
| customer, churn, retention | `customer_analysis` |
| product, inventory, margin | `product_performance` |
| region, regional, geography, city | `regional_sales` |

### Rate limiting

AI endpoints are limited to **10 requests per 15 minutes per IP** using `express-rate-limit`. Exceeding returns `{ error: "Too many requests" }`.

### AI endpoints

| Endpoint | Saves to DB | Returns |
|---|---|---|
| `POST /api/ai/interpret` | No | `{ layoutConfig }` |
| `POST /api/ai/generate-layout` | Yes (Interaction) | `{ layoutConfig, interactionId }` |
| `POST /api/ai/transform` | Yes (Interaction) | flat `layoutConfig` object |

### AI response schema

```json
{
  "intent": "transaction_investigation",
  "taskTitle": "Investigate Failed Transactions",
  "description": "Analyze today's failed payment transactions.",
  "layout": { "type": "investigation", "columns": 2 },
  "visibleComponents": ["FailureAnalytics", "FailedTransactionTable", "ErrorDistribution", "ResolutionPanel"],
  "hiddenComponents": ["RevenueChart", "CustomerGrowthChart", "MarketingAnalytics"],
  "filters": { "date": "today", "status": "failed" },
  "navigation": ["Investigation Overview", "Failed Transactions", "Failure Analysis", "Resolution"],
  "priority": ["failed_transactions", "failure_reasons", "resolution"]
}
```

---

## Component Registry (28 Widgets)

**File:** `client/src/components/dashboard/componentRegistry.js`

All 28 components are imported and exported as a plain object. The AI (and demo mode) only reference string keys. `DashboardLayout.jsx` looks up each key in the registry and renders the component. Any key not in the registry is silently ignored — no crash.

### Default dashboard (12 widgets)

| Key | Description |
|---|---|
| `RevenueCard` | Total revenue KPI card |
| `OrdersCard` | Total orders KPI card |
| `CustomerCard` | Active customers KPI card |
| `ConversionCard` | Conversion rate KPI card |
| `RevenueChart` | Monthly revenue line/bar chart |
| `SalesChart` | Sales performance chart |
| `CustomerGrowthChart` | Customer growth over time |
| `TransactionTable` | Recent transactions table |
| `RegionalSalesChart` | Revenue by region bar chart |
| `ProductPerformance` | Top products performance |
| `NotificationPanel` | System notifications list |
| `MarketingAnalytics` | Campaign metrics and ROI |

### Extended widgets (16 task-specific)

| Key | Used in workflow |
|---|---|
| `FailureAnalytics` | Transaction Investigation |
| `FailedTransactionTable` | Transaction Investigation |
| `ErrorDistribution` | Transaction Investigation |
| `ResolutionPanel` | Transaction Investigation |
| `CustomerSegmentation` | Customer Analysis |
| `ChurnAnalysis` | Customer Analysis |
| `CustomerLifetimeValue` | Customer Analysis |
| `EngagementMetrics` | Customer Analysis |
| `ProductRankingTable` | Product Performance |
| `DecliningSalesChart` | Product Performance |
| `InventoryStatus` | Product Performance |
| `ProfitMarginChart` | Product Performance |
| `RegionalMap` | Regional Sales |
| `CityPerformance` | Regional Sales |
| `SalesRepPerformance` | Regional Sales |
| `RegionalComparison` | Regional Sales |

All widgets use hardcoded sample data from `client/src/data/sampleData.js` — no external data fetching required.

---

## The 5 Business Workflows

Each workflow replaces the entire dashboard with a task-specific set of components and navigation.

### Workflow 1 — Transaction Investigation
**Trigger phrases:** "investigate failed transactions", "payment failure", "failed transaction"
```
Components: FailureAnalytics, FailedTransactionTable, ErrorDistribution, ResolutionPanel, TransactionTable
Navigation: Investigation Overview → Failed Transactions → Failure Analysis → Resolution
Layout: 2-column investigation grid
```

### Workflow 2 — Revenue Analysis
**Trigger phrases:** "analyze revenue", "revenue growth", "sales performance"
```
Components: RevenueCard, RevenueChart, SalesChart, RegionalSalesChart, ProductPerformance
Navigation: Revenue Overview → Monthly Trends → Regional Performance → Comparison
Layout: 2-column analysis grid
```

### Workflow 3 — Customer Analysis
**Trigger phrases:** "customer churn", "customers who stopped", "retention"
```
Components: CustomerCard, CustomerSegmentation, ChurnAnalysis, CustomerLifetimeValue, EngagementMetrics
Navigation: Customer Overview → Segments → Churn Analysis → Lifetime Value
Layout: 2-column analysis grid
```

### Workflow 4 — Product Performance
**Trigger phrases:** "product performance", "declining sales", "inventory", "profit margin"
```
Components: ProductPerformance, ProductRankingTable, DecliningSalesChart, InventoryStatus, ProfitMarginChart
Navigation: Product Overview → Rankings → Declining Sales → Inventory → Margins
Layout: 2-column grid
```

### Workflow 5 — Regional Sales
**Trigger phrases:** "regional sales", "compare regions", "city performance"
```
Components: RegionalSalesChart, RegionalMap, CityPerformance, SalesRepPerformance, RegionalComparison
Navigation: Regional Overview → Map View → City Performance → Sales Reps
Layout: 2-column map-style grid
```

---

## Dynamic UI Engine

**Files:** `client/src/components/dashboard/AdaptiveDashboard.jsx`, `DashboardLayout.jsx`

### State managed by `AdaptiveDashboard`

| State | Purpose |
|---|---|
| `layoutConfig` | Current AI-generated config object (null = default) |
| `previousLayout` | Saved component list before last transformation (for diff) |
| `isTransformed` | Whether a transformation is active |
| `showBeforeAfter` | Controls BeforeAfterPanel visibility |
| `showHistory` | Controls LayoutHistory panel |
| `showPersonalization` | Controls PersonalizationPanel |
| `showFeedback` | Controls FeedbackWidget (auto-hides after 30 seconds) |
| `isLoading` | Shows LoadingSkeleton during AI call |
| `isDemoRunning` | Locks Demo button during automated sequence |
| `isDark` | Dark mode toggle, persisted to localStorage |
| `isSidebarOpen` | Sidebar open/collapsed, defaults to closed on mobile |
| `activeNavItem` | Highlighted nav item |
| `error` | Inline error message |

### `applyLayout(config, id)`

Core transformation function:
1. Saves current component list to `previousLayout`
2. Sets new `layoutConfig`
3. Sets `isTransformed = true`
4. Shows BeforeAfterPanel and FeedbackWidget
5. Updates nav active item
6. Auto-saves to `/api/workspaces` (non-blocking)
7. Starts 30-second feedback dismiss timer

### `handleReset()`

Returns to the 12-widget default dashboard, clears all transformation state.

### `DashboardLayout`

Receives an array of component key strings. For each key, looks up the component in `componentRegistry`, wraps it in a `motion.div` with `AnimatePresence` for smooth enter/exit, and renders it in a responsive CSS grid.

---

## Adaptive Navigation

**File:** `client/src/components/dashboard/AdaptiveNav.jsx`

The sidebar has two states:

**Default state** (7 items with icons):
Overview, Sales, Customers, Products, Transactions, Reports, Settings

**Transformed state** (task-specific string items from AI response):
e.g., "Investigation Overview", "Failed Transactions", "Failure Analysis", "Resolution"

When transformed, a "Task Workspace" badge appears above the nav items with the current task title. A "Return to Default" button appears at the bottom.

The sidebar collapses to icon-only mode (w-16) and expands to full width (w-64) via the toggle button. On mobile (< 768px) it defaults to collapsed. Nav items animate in/out with `AnimatePresence mode="popLayout"`.

---

## Before/After Comparison Panel

**File:** `client/src/components/dashboard/BeforeAfterPanel.jsx`

A slide-in panel from the right (spring animation, x: 100% → 0) showing:

- **Stats row** — count of Added (green), Removed (red), Retained (blue) components
- **Before column** — original component list, removed items shown with red strikethrough
- **After column** — new component list, added items highlighted green
- **Intent badge** — current detected intent
- **Description** — AI-generated task description
- **Backdrop** — clicking outside closes the panel

Triggered automatically on every transformation. Can also be opened via "Show Comparison" in the TaskBanner.

---

## Demo Mode

**Triggered by:** "Demo" button (▶) in the top bar

Runs an automated sequence (non-blocking async loop):
1. Wait 3 seconds → apply Transaction Investigation
2. Wait 3 seconds → apply Revenue Analysis
3. Wait 3 seconds → apply Regional Sales
4. Wait 4 seconds → reset to default

During the sequence a "Demo mode" badge appears in the top bar. The Demo button is disabled and shows "Running…". Each step triggers the full `applyLayout()` flow including BeforeAfterPanel and auto-save.

---

## Feedback System

**Files:** `client/src/components/feedback/FeedbackWidget.jsx`, `server/src/routes/feedback.js`

After every transformation, a FeedbackWidget appears below the dashboard (auto-hides after 30 seconds).

Options:
- **Helpful** → POST `/api/feedback` `{ interactionId, feedback: "helpful" }`
- **Not Helpful** → POST `/api/feedback` `{ interactionId, feedback: "not_helpful" }`
- **Customize** → POST `/api/feedback` `{ interactionId, feedback: "customized" }`

Feedback updates the `feedback` field on the matching `Interaction` document.

**GET `/api/feedback/history`** returns the last 20 interactions for the user (sorted newest first).

---

## Layout History

**File:** `client/src/components/history/LayoutHistory.jsx`

A slide-in panel opened by the Clock icon in the top bar.

- Calls `GET /api/workspaces` on open — returns all saved workspaces for the user, newest first
- Each entry shows task title, intent, and timestamp
- Clicking an entry calls `applyLayout()` with the saved `layoutConfig` — fully restoring that workspace
- Workspaces are auto-saved after every transformation via `POST /api/workspaces`

---

## Personalization

**File:** `client/src/components/personalization/PersonalizationPanel.jsx`

A slide-in panel opened by the Settings (SlidersHorizontal) icon.

- Light/dark theme toggle (also updates `PUT /api/preferences`)
- Pin frequently used components
- Hide unwanted components
- Changes saved to `user.preferences` in MongoDB via `PUT /api/preferences`
- AI considers saved preferences when generating new layouts

**Preferences stored on User model:**
```json
{
  "theme": "light | dark",
  "pinnedComponents": [],
  "hiddenComponents": []
}
```

---

## Database Models

### User
```js
{
  name: String,            // required
  email: String,           // required, unique, lowercase
  password: String,        // bcrypt hashed (pre-save hook, 10 rounds)
  preferences: Mixed,      // { theme, pinnedComponents, hiddenComponents }
  defaultLayout: [String], // array of component keys
  createdAt: Date
}
```
Methods: `comparePassword(candidate)` → bcrypt.compare

### Dashboard
```js
{
  userId: ObjectId,        // ref: User
  name: String,            // default: 'My Dashboard'
  layoutConfig: Mixed,     // { visibleComponents, hiddenComponents, layout }
  isDefault: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Workspace
```js
{
  userId: ObjectId,        // ref: User
  title: String,           // required (taskTitle from AI)
  intent: String,          // e.g. 'transaction_investigation'
  prompt: String,          // original user input
  layoutConfig: Mixed,     // full AI response config
  timestamp: Date
}
```

### Interaction
```js
{
  userId: ObjectId,        // ref: User
  prompt: String,          // required
  aiResponse: Mixed,       // raw AI response
  layoutApplied: Mixed,    // validated config that was applied
  feedback: String,        // enum: helpful | not_helpful | customized | null
  timestamp: Date
}
```

---

## API Reference

All protected routes require `Authorization: Bearer <token>` header.

### Authentication

| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/api/auth/register` | No | `{ name, email, password }` | `{ token, user }` |
| POST | `/api/auth/login` | No | `{ email, password }` | `{ token, user }` |
| GET | `/api/auth/me` | Yes | — | User object (no password) |

### AI Intent Engine

| Method | Endpoint | Auth | Rate Limit | Body | Response |
|---|---|---|---|---|---|
| POST | `/api/ai/interpret` | Yes | 10/15min | `{ prompt }` | `{ layoutConfig }` |
| POST | `/api/ai/generate-layout` | Yes | 10/15min | `{ prompt }` | `{ layoutConfig, interactionId }` |
| POST | `/api/ai/transform` | Yes | 10/15min | `{ prompt }` or `{ query }` | flat `layoutConfig` |

### Dashboard

| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| GET | `/api/dashboard` | Yes | — | Dashboard doc (creates default if none) |
| PUT | `/api/dashboard/layout` | Yes | `{ layoutConfig }` | Updated Dashboard doc |

### Workspaces

| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/api/workspaces` | Yes | `{ title, intent, prompt, layoutConfig }` | Created Workspace |
| GET | `/api/workspaces` | Yes | — | Array of user's workspaces (newest first) |
| GET | `/api/workspaces/:id` | Yes | — | Single Workspace |
| DELETE | `/api/workspaces/:id` | Yes | — | `{ success: true }` |

### Feedback

| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/api/feedback` | Yes | `{ interactionId, feedback }` | `{ success: true }` |
| GET | `/api/feedback/history` | Yes | — | Last 20 Interaction docs |

### Preferences

| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| GET | `/api/preferences` | Yes | — | `user.preferences` object |
| PUT | `/api/preferences` | Yes | Partial preferences object | Updated `user.preferences` |

---

## Security

| Concern | Implementation |
|---|---|
| Password storage | bcryptjs, 10 salt rounds, hashed in pre-save Mongoose hook |
| Authentication | JWT, `Authorization: Bearer` header, 7-day expiry |
| Protected routes | `verifyToken` middleware on all non-auth routes |
| API key exposure | `GEMINI_API_KEY` used only in `server/src/routes/ai.js`, never sent to client |
| Component injection | AI response filtered against `COMPONENT_WHITELIST` before rendering; unknown keys stripped |
| Data isolation | All workspace/feedback/dashboard queries filter by `req.userId` |
| Rate limiting | `express-rate-limit`: 10 AI requests per 15 min per IP |
| Input validation | Required fields checked on all POST endpoints, 400 returned on missing data |
| CORS | Restricted to `CLIENT_URL` origin |
| `.env` | Listed in `.gitignore`, never committed |

---

## Error Handling

| Scenario | Handling |
|---|---|
| Gemini API unavailable | Catches error, falls back to keyword detection silently |
| Gemini returns invalid JSON | Regex extraction + try/catch, falls back to keyword detection |
| Unknown component key in AI response | Filtered out by whitelist before `applyLayout()` |
| Network error from frontend | Axios interceptor, inline error message in IntentBar and AdaptiveDashboard |
| 401 Unauthorized | Axios response interceptor clears storage and redirects to `/login` |
| MongoDB connection failure | `process.exit(1)` with logged error message |
| React render error | `ErrorBoundary` class component catches and shows reload button |
| AI rate limit exceeded | 429 response: `{ error: "Too many requests" }` |
| Missing required fields | 400 response with descriptive error message |
| Workspace not found | 404 response |
| Access to another user's workspace | 403 response |

---

## Deployment

### Frontend — Vercel

```bash
cd client
npm run build
# Deploy the dist/ folder
```

Or connect the GitHub repo to Vercel and set:
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`

### Backend — Render

- Connect GitHub repo
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Add all environment variables in the Render dashboard

### Database — MongoDB Atlas

1. Create a free M0 cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Network Access → Add IP → Allow from Anywhere (`0.0.0.0/0`) for development
3. Create a database user
4. Get the connection string and set as `MONGO_URI`

---

## Development Tips

- `npm run dev` in `server/` uses nodemon — server auto-restarts on any `.js`, `.json`, or `.mjs` file change
- Vite dev server proxies `/api/*` → `http://localhost:5000` — no CORS issues in development
- Gemini API key is optional — all 5 workflows work without it via keyword fallback
- Sample data is hardcoded in `client/src/data/sampleData.js` — no external API needed for charts
- The `data/` folder in client contains realistic business metrics for all 28 widgets

---

## License

MIT
