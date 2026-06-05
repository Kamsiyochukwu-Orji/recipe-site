import type { Recipe, RecipeSummary, Category } from '@/types'

const BASE = 'https://www.themealdb.com/api/json/v1/1'

export async function searchRecipes(query: string): Promise<RecipeSummary[]> {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`)
  const data = await res.json()
  return data.meals ?? []
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`)
  const data = await res.json()
  return data.meals?.[0] ?? null
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/categories.php`)
  const data = await res.json()
  return data.categories ?? []
}

export async function getByCategory(category: string): Promise<RecipeSummary[]> {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`)
  const data = await res.json()
  return data.meals ?? []
}

export async function getRandomRecipes(count = 8): Promise<Recipe[]> {
  const results = await Promise.all(
    Array.from({ length: count }, () =>
      fetch(`${BASE}/random.php`).then(r => r.json()).then(d => d.meals?.[0])
    )
  )
  return results.filter(Boolean)
}

export function extractIngredients(recipe: Recipe) {
  const ingredients: { name: string; measure: string }[] = []
  for (let i = 1; i <= 20; i++) {
    const name = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: measure?.trim() ?? '' })
    }
  }
  return ingredients
}
