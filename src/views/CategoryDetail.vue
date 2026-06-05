<template>
  <div class="page">
    <RouterLink to="/categories" class="back-link">← All Categories</RouterLink>
    <h1 class="section-title" style="margin-top:1rem">{{ name }}</h1>
    <p class="subtitle">{{ meals.length }} recipes</p>

    <div v-if="loading" class="grid-4">
      <div v-for="n in 8" :key="n" class="skeleton" style="height:280px" />
    </div>

    <div v-else-if="meals.length === 0" class="empty">No recipes found.</div>

    <div v-else class="grid-4">
      <RecipeCard v-for="r in meals" :key="r.idMeal" :recipe="r" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import RecipeCard from '@/components/RecipeCard.vue'
import { getByCategory } from '@/composables/useApi'
import type { RecipeSummary } from '@/types'

const route = useRoute()
const name = ref(route.params.name as string)
const meals = ref<RecipeSummary[]>([])
const loading = ref(true)

async function load() {
  loading.value = true
  meals.value = await getByCategory(name.value)
  loading.value = false
}

onMounted(load)
watch(() => route.params.name, (v) => { name.value = v as string; load() })
</script>

<style scoped>
.back-link {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.15s;
}
.back-link:hover { color: var(--accent); }
.subtitle { font-size: 14px; color: var(--text-secondary); margin-bottom: 1.5rem; }
.empty { text-align: center; padding: 4rem; color: var(--text-secondary); }
</style>
