<template>
  <div class="page">
    <button class="back-link" @click="router.back()">← Back</button>

    <div v-if="loading" class="detail-skeleton">
      <div class="skeleton" style="height:400px;border-radius:16px" />
      <div style="display:flex;flex-direction:column;gap:12px;padding-top:1rem">
        <div class="skeleton" style="height:36px;width:60%" />
        <div class="skeleton" style="height:16px;width:40%" />
        <div class="skeleton" style="height:120px" />
      </div>
    </div>

    <div v-else-if="!recipe" class="empty">Recipe not found.</div>

    <div v-else class="detail">
      <div class="detail-hero">
        <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="detail-img" />
        <div class="detail-info">
          <div class="detail-tags">
            <span class="tag">{{ recipe.strCategory }}</span>
            <span class="tag">{{ recipe.strArea }}</span>
            <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <h1 class="detail-title">{{ recipe.strMeal }}</h1>
          <div class="detail-actions">
            <a v-if="recipe.strYoutube" :href="recipe.strYoutube" target="_blank" class="btn-accent">
              ▶ Watch on YouTube
            </a>
            <a v-if="recipe.strSource" :href="recipe.strSource" target="_blank" class="btn-ghost">
              Original recipe ↗
            </a>
          </div>
        </div>
      </div>

      <div class="detail-body">
        <aside class="ingredients-panel">
          <h2>Ingredients</h2>
          <ul class="ingredients-list">
            <li v-for="ing in ingredients" :key="ing.name">
              <span class="ing-measure">{{ ing.measure }}</span>
              <span class="ing-name">{{ ing.name }}</span>
            </li>
          </ul>
        </aside>

        <div class="instructions-panel">
          <h2>Instructions</h2>
          <div class="instructions">
            <p v-for="(step, i) in steps" :key="i" class="step">
              <span class="step-num">{{ i + 1 }}</span>
              <span>{{ step }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRecipeById, extractIngredients } from '@/composables/useApi'
import type { Recipe } from '@/types'

const route = useRoute()
const router = useRouter()
const recipe = ref<Recipe | null>(null)
const loading = ref(true)

const ingredients = computed(() => recipe.value ? extractIngredients(recipe.value) : [])

const tags = computed(() =>
  recipe.value?.strTags?.split(',').map(t => t.trim()).filter(Boolean) ?? []
)

const steps = computed(() =>
  recipe.value?.strInstructions
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(s => s.length > 10) ?? []
)

async function load() {
  loading.value = true
  recipe.value = await getRecipeById(route.params.id as string)
  loading.value = false
}

onMounted(load)
watch(() => route.params.id, load)
</script>

<style scoped>
.back-link {
  background: none;
  border: none;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.5rem;
  display: inline-block;
  font-family: 'DM Sans', sans-serif;
  transition: color 0.15s;
}
.back-link:hover { color: var(--accent); }

.detail-skeleton { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }

.empty { text-align: center; padding: 4rem; color: var(--text-secondary); }

.detail { display: flex; flex-direction: column; gap: 2.5rem; }

.detail-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.detail-img {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 16px;
  object-fit: cover;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.5rem;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 12px;
  font-weight: 500;
  background: var(--tag-bg);
  color: var(--text-secondary);
  padding: 3px 10px;
  border-radius: 999px;
}

.detail-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--text-primary);
}

.detail-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-accent {
  padding: 10px 18px;
  background: var(--accent);
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.15s;
}
.btn-accent:hover { opacity: 0.85; }

.btn-ghost {
  padding: 10px 18px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.15s;
}
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

.detail-body {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  align-items: start;
}

.ingredients-panel, .instructions-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.ingredients-panel h2, .instructions-panel h2 {
  font-family: 'Fraunces', serif;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.ingredients-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ingredients-list li {
  display: flex;
  gap: 10px;
  padding: 7px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  align-items: baseline;
}

.ingredients-list li:last-child { border-bottom: none; }

.ing-measure {
  font-weight: 600;
  color: var(--accent);
  min-width: 60px;
  font-size: 13px;
}

.ing-name { color: var(--text-primary); }

.instructions { display: flex; flex-direction: column; gap: 1rem; }

.step {
  display: flex;
  gap: 14px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
  align-items: flex-start;
}

.step-num {
  background: var(--accent-light);
  color: var(--accent);
  font-weight: 700;
  font-size: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .detail-hero, .detail-body { grid-template-columns: 1fr; }
  .detail-skeleton { grid-template-columns: 1fr; }
}
</style>
