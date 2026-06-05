<template>
  <RouterLink :to="`/recipe/${recipe.idMeal}`" class="card">
    <div class="card-img-wrap">
      <img :src="recipe.strMealThumb" :alt="recipe.strMeal" loading="lazy" />
    </div>
    <div class="card-body">
      <p class="card-title">{{ recipe.strMeal }}</p>
      <slot />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { RecipeSummary } from '@/types'
defineProps<{ recipe: RecipeSummary }>()
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.18s, box-shadow 0.18s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.card-img-wrap {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.card-img-wrap img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
}

.card:hover .card-img-wrap img { transform: scale(1.05); }

.card-body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.card-title {
  font-family: 'Fraunces', serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
}
</style>
