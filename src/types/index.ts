export interface Recipe {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags: string | null
  strYoutube: string | null
  strSource: string | null
  [key: string]: string | null
}

export interface RecipeSummary {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

export interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

export interface Ingredient {
  name: string
  measure: string
}
