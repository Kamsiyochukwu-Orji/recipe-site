<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <h1 class="hero-title">Discover recipes<br /><em>from around the world</em></h1>
        <p class="hero-sub">Search thousands of meals, explore categories, and find your next favourite dish.</p>
        <div class="search-bar">
          <input
            v-model="query"
            type="text"
            placeholder="Search recipes… e.g. pasta, chicken, sushi"
            @keyup.enter="doSearch"
          />
          <button @click="doSearch">Search</button>
        </div>
      </div>
    </section>

    <div class="page">
      <!-- Search results -->
      <section v-if="searched">
        <h2 class="section-title">
          {{ results.length ? `Results for "${query}"` : `No results for "${query}"` }}
        </h2>
        <div v-if="searching" class="grid-4">
          <div v-for="n in 8" :key="n" class="skeleton" style="height:280px" />
        </div>
        <div v-else class="grid-4">
          <RecipeCard v-for="r in results" :key="r.idMeal" :recipe="r" />
        </div>
        <button class="btn-ghost" style="margin-top:1.5rem" @click="clearSearch">← Back to home</button>
      </section>

      <!-- Random picks -->
      <template v-else>
        <section>
          <h2 class="section-title">Today's picks</h2>
          <div v-if="loadingRandom" class="grid-4">
            <div v-for="n in 8" :key="n" class="skeleton" style="height:280px" />
          </div>
          <div v-else class="grid-4">
            <RecipeCard v-for="r in randoms" :key="r.idMeal" :recipe="r">
              <span class="tag">{{ r.strCategory }}</span>
            </RecipeCard>
          </div>
        </section>

        <section style="margin-top:3rem">
          <h2 class="section-title">Browse categories</h2>
          <div class="cat-strip">
            <RouterLink
              v-for="c in categories"
              :key="c.idCategory"
              :to="`/categories/${c.strCategory}`"
              class="cat-chip"
            >
              <img :src="c.strCategoryThumb" :alt="c.strCategory" />
              <span>{{ c.strCategory }}</span>
            </RouterLink>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RecipeCard from '@/components/RecipeCard.vue'
import { searchRecipes, getRandomRecipes, getCategories } from '@/composables/useApi'
import type { RecipeSummary, Category } from '@/types'

const query = ref('')
const results = ref<RecipeSummary[]>([])
const randoms = ref<any[]>([])
const categories = ref<Category[]>([])
const searched = ref(false)
const searching = ref(false)
const loadingRandom = ref(true)

async function doSearch() {
  if (!query.value.trim()) return
  searched.value = true
  searching.value = true
  results.value = await searchRecipes(query.value)
  searching.value = false
}

function clearSearch() {
  searched.value = false
  query.value = ''
  results.value = []
}

onMounted(async () => {
  const [r, c] = await Promise.all([getRandomRecipes(8), getCategories()])
  randoms.value = r
  categories.value = c.slice(0, 14)
  loadingRandom.value = false
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #1c1a16 0%, #3a2e1e 100%);
  padding: 4rem 1.5rem;
}

.hero-inner {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;
}

.hero-title em {
  color: #e8a87c;
  font-style: italic;
}

.hero-sub {
  font-size: 15px;
  color: #b0a898;
  margin-bottom: 1.75rem;
  line-height: 1.6;
}

.search-bar {
  display: flex;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.3);
}

.search-bar input {
  flex: 1;
  padding: 14px 18px;
  font-size: 15px;
  border: none;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  color: var(--text-primary);
}

.search-bar button {
  padding: 0 22px;
  background: var(--accent);
  color: #fff;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
  font-family: 'DM Sans', sans-serif;
}

.search-bar button:hover { opacity: 0.85; }

.tag {
  font-size: 12px;
  font-weight: 500;
  background: var(--tag-bg);
  color: var(--text-secondary);
  padding: 3px 9px;
  border-radius: 999px;
  align-self: flex-start;
}

.cat-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cat-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.15s;
}

.cat-chip:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-light);
}

.cat-chip img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.btn-ghost {
  padding: 9px 16px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
</style>
