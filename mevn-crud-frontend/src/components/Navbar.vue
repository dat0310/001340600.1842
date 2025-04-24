<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/words" exact class="nav-item">Words</router-link>
      <router-link to="/words/new" class="nav-item">New</router-link>
      <router-link to="/test" class="nav-item">Test</router-link>
      <router-link to="/translator" class="nav-item">Translator</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>

<style scoped>
.navbar {
  background-color: #4A90E2;
  padding: 15px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 30px;
}
.nav-item {
  color: #FFF;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.nav-item:hover {
  background-color: #357ABD;
}
.nav-item.active {
  background-color: #2C6CA8;
}
</style>