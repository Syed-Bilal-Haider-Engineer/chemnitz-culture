# 🌍 Chemnitz Cultural Explorer

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0-blue)](https://nodejs.org/)
[![PostgreSQL Version](https://img.shields.io/badge/postgresql-%3E%3D14.0-blue)](https://www.postgresql.org/)

![App Preview](public/images/app-preview.gif)

An interactive web platform showcasing cultural landmarks in Chemnitz, Germany, powered by open data sources with personalized touring features.

## ✨ Key Features

### 🗺️ Exploration Tools
- Interactive map with 150+ cultural sites
- Custom categories: Museums, Theaters, Public Art, Historic Sites
- Real-time filtering by:
  - Distance from current location
  - Categories
  - Keyword based search

### 👤 User Experience
- **Personalized Accounts**:
  - Display places data on mapbox
  - Save favorite locations
  - Create User account
  - List of favorite sites
  - Display details of saved sites and sites

### 🚀 Technical Highlights
- Offline-first PWA support
- Optimized routing algorithms
- Accessibility compliant (WCAG 2.1 AA)

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js 15 | React Framework |
| Mapbox GL JS | Interactive Maps |
| Tailwind CSS | Utility-first CSS |
| React Query | Data Fetching |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Runtime |
| Express | API Server |
| PostgreSQL | Database |
| PostGIS | Geospatial Queries |
| Prisma | ORM |

### DevOps
| Technology | Purpose |
|------------|---------|
| GitHub | Git |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ with PostGIS extension
- Mapbox API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Syed-Bilal-Haider-Engineer/chemnitz-culture
   cd chemnitz-culture
   cd client
   cd server
Set up environment variables

bash
cp .env.example .env.local
# Edit the file with your credentials
Install dependencies

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

bash
Create database in postgreSQL and then 
# Run migrations
npm run migrate

# Seed initial data
npm run seed
Running the Application
Development Mode

bash
npm run dev
Production Build

bash
npm run build
npm start
📂 Project Structure
text
.
├── app/                  # Next.js app router
│   ├── (auth)/          # Authentication routes
│   ├── (_lib)           # API routes
├── components/          # Reusable components
│   ├── layout/          # Layouts
│   └── common/          # Reuseabliity

├── public/              # Static assets
├── styles/              # Global styles
└── types/               # TypeScript definitions
🌐 API Documentation
Base URL
https://api.chemnitz-culture.com/v1

Key Endpoints
Endpoint	Method	Description	Auth Required
/sites	GET	List all cultural sites	No
/sites/search	GET	Search with filters	No
/favorites	POST	Add favorite	Yes
/itineraries	POST	Create route	Yes
// Add review of place
View Complete API Documentation →

🔒 Security Features
JWT Authentication

Data encryption at rest

Automated security headers

🚴 Performance
Metric	Value	Target
LCP	1.2s	<2.5s
TTI	1.8s	<3.5s
Bundle Size	145kB	<200kB
📱 Offline Support
Service Worker caching (Workbox)

Localstorage for local data

Background sync for updates