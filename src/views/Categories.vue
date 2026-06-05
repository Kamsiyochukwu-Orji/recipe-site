<template>
  <div class="page">
    <h1 class="section-title">All Categories</h1>
    <p class="subtitle">{{ categories.length }} cuisine types to explore</p>

    <div v-if="loading" class="grid-3" style="margin-top:1.5rem">
      <div v-for="n in 9" :key="n" class="skeleton" style="height:200px" />
    </div>

    <div v-else class="categories-grid">
      <RouterLink
        v-for="c in categories"
        :key="c.idCategory"
        :to="`/categories/${c.strCategory}`"
        class="cat-card"
      >
        <div class="cat-img-wrap">
          <img :src="c.strCategoryThumb" :alt="c.strCategory" loading="lazy" />
          <div class="cat-overlay">
            <span class="cat-name">{{ c.strCategory }}</span>
          </div>
        </div>
        <p class="cat-desc">{{ c.strCategoryDescription.slice(0, 90) }}…</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCategories } from '@/composables/useApi'
import type { Category } from '@/types'

const categories = ref<Category[]>([])
const loading = ref(true)

onMounted(async () => {
  categories.value = await getCategories()
  loading.value = false
})
</script>

<style scoped>
.subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.cat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.18s, box-shadow 0.18s;
}

.cat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.cat-img-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.cat-img-wrap img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
}

.cat-card:hover .cat-img-wrap img { transform: scale(1.06); }

.cat-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
  display: flex;
  align-items: flex-end;
  padding: 14px;
}

.cat-name {
  font-family: 'Fraunces', serif;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.cat-desc {
  padding: 12px 14px;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.55;
}
</style>
