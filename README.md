# 🍴 Reciply — Recipe Discovery App

A full-featured recipe discovery web app built with **Vue 3**, **TypeScript**, and **Vue Router**. Browse thousands of real recipes from around the world, powered by the free TheMealDB API.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [https://recipe-site-ltem.vercel.app/](https://recipe-site-ltem.vercel.app/) in your browser.

---

## 🗂 Project Structure

```
recipe-app/
├── public/
├── src/
│   ├── assets/
│   │   └── main.css          # Global styles & design tokens
│   ├── components/
│   │   └── RecipeCard.vue    # Reusable recipe card component
│   ├── composables/
│   │   └── useApi.ts         # All API calls & data utilities
│   ├── router/
│   │   └── index.ts          # Vue Router configuration
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── views/
│   │   ├── Home.vue          # Home page with search & random picks
│   │   ├── Categories.vue    # All categories grid
│   │   ├── CategoryDetail.vue # Recipes filtered by category
│   │   └── RecipeDetail.vue  # Full recipe detail page
│   ├── App.vue               # Root component with Navbar & Footer
│   └── main.ts               # App entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📄 Pages & Routing

| Route               | Component            | Description                                         |
| ------------------- | -------------------- | --------------------------------------------------- |
| `/`                 | `Home.vue`           | Hero search bar, random daily picks, category chips |
| `/categories`       | `Categories.vue`     | Full grid of all cuisine categories                 |
| `/categories/:name` | `CategoryDetail.vue` | All recipes within a selected category              |
| `/recipe/:id`       | `RecipeDetail.vue`   | Full recipe with ingredients and instructions       |

---

## 🔌 API

Uses the **[TheMealDB API](https://www.themealdb.com/api.php)** — completely free with no API key required.

| Function               | Endpoint          | Description                  |
| ---------------------- | ----------------- | ---------------------------- |
| `searchRecipes(query)` | `/search.php?s=`  | Search recipes by name       |
| `getRecipeById(id)`    | `/lookup.php?i=`  | Fetch a single recipe        |
| `getCategories()`      | `/categories.php` | Fetch all cuisine categories |
| `getByCategory(name)`  | `/filter.php?c=`  | Fetch recipes by category    |
| `getRandomRecipes(n)`  | `/random.php`     | Fetch n random recipes       |

All API logic lives in `src/composables/useApi.ts`.

---

## 🧩 Key Features

- **Search** — live search from the hero bar, results replace the homepage feed
- **Random daily picks** — 8 random recipes fetched on every home load
- **Category browsing** — visual category grid with image overlays
- **Recipe detail** — full ingredients list, numbered step-by-step instructions, YouTube link, and source link
- **Skeleton loaders** — shown while API data is loading on every page
- **Scroll to top** — router is configured to scroll to top on every navigation

---

## 🛠 Tech Stack

| Tool         | Purpose                         |
| ------------ | ------------------------------- |
| Vue 3        | UI framework (Composition API)  |
| TypeScript   | Type safety                     |
| Vue Router 4 | Client-side routing             |
| Vite         | Build tool & dev server         |
| Google Fonts | Typography (Fraunces + DM Sans) |

---

## 🌍 Deployment

This app requires no environment variables. Deploy to **Vercel** in two steps:

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com) — Vercel auto-detects Vite

For SPA routing to work on Vercel, add a `vercel.json` at the root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 📸 Pages Overview

- **Home** — Hero search, random recipe grid, category quick-links
- **Categories** — Full card grid with image overlays and descriptions
- **Category Detail** — Filtered recipe grid for a selected cuisine
- **Recipe Detail** — Photo, tags, ingredients panel, numbered instructions, action buttons

---

## 📝 License

MIT — free to use and modify.
