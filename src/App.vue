<template>
  <header class="navbar">
    <RouterLink to="/" class="brand">
      <span class="brand-icon">🍴</span>
      <span class="brand-name">Reciply</span>
    </RouterLink>
    <nav class="nav-links">
      <RouterLink to="/" exact-active-class="active">Home</RouterLink>
      <RouterLink to="/categories" active-class="active">Categories</RouterLink>
    </nav>
  </header>
  <RouterView />
  <footer class="footer">
    <p>Powered by <a href="https://www.themealdb.com" target="_blank">TheMealDB</a> · Built with Vue 3</p>
  </footer>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 62px;
  background: #fff;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-icon { font-size: 20px; }

.brand-name {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-links a {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.15s;
}

.nav-links a:hover { background: var(--bg-hover); color: var(--text-primary); }
.nav-links a.active { background: var(--accent-light); color: var(--accent); }

.footer {
  text-align: center;
  padding: 2rem;
  font-size: 13px;
  color: var(--text-secondary);
  border-top: 1px solid var(--border);
  margin-top: 3rem;
}

.footer a { color: var(--accent); }
</style>
