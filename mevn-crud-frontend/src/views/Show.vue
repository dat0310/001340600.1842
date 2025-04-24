<template>
  <div class="show-page">
    <Navbar />
    <div class="container">
      <h1>Word Details</h1>
      <div class="word-details">
        <div class="input-group">
          <label>English</label>
          <input type="text" :value="word.english" readonly />
        </div>
        <div class="input-group">
          <label>German</label>
          <input type="text" :value="word.german" readonly />
        </div>
        <div class="input-group">
          <label>French</label>
          <input type="text" :value="word.french" readonly />
        </div>
        <router-link :to="{ name: 'edit', params: { id: $route.params.id } }" class="btn btn-primary">
          Edit Word
        </router-link>
        <router-link :to="{ name: 'words', params: { id: $route.params.id } }" class="btn btn-primary">
          back to list
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/api';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'ShowWord',
  components: { Navbar },
  data() {
    return {
      word: {}
    };
  },
  async mounted() {
    try {
      this.word = await api.getWord(this.$route.params.id);
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  }
};
</script>

<style scoped>
.show-page {
  padding-top: 80px;
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
.word-details {
  background: #FFF;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.input-group {
  display: flex;
  flex-direction: column;
}
label {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}
input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #CCC;
  border-radius: 5px;
  background: #F0F0F0;
}
.btn {
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  color: #FFF;
}
.btn-primary {
  background-color: #4A90E2;
}
.btn-primary:hover {
  background-color: #357ABD;
}
</style>