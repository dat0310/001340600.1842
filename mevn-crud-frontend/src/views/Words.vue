<template>
  <div class="words-page">
    <Navbar />
    <div class="container">
      <h1>Words</h1>
      <table class="word-table">
        <thead>
          <tr>
            <th>English</th>
            <th>German</th>
            <th>French</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="word in words" :key="word._id">
            <td>{{ word.english }}</td>
            <td>{{ word.german }}</td>
            <td>{{ word.french }}</td>
            <td class="actions">
              <router-link :to="{ name: 'show', params: { id: word._id } }" class="action-link">Show</router-link>
              <router-link :to="{ name: 'edit', params: { id: word._id } }" class="action-link">Edit</router-link>
              <a href="#" @click.prevent="onDestroy(word._id)" class="action-link delete">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/api';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Words',
  components: { Navbar },
  data() {
    return {
      words: []
    };
  },
  methods: {
    async onDestroy(id) {
      if (!confirm('Are you sure you want to delete this word?')) return;
      try {
        await api.deleteWord(id);
        this.words = this.words.filter(word => word._id !== id);
        console.log('Word deleted successfully!');
      } catch (error) {
        console.error('Error deleting word:', error);
      }
    },
    async fetchWords() {
      try {
        this.words = await api.getWords();
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    }
  },
  mounted() {
    this.fetchWords();
  }
};
</script>

<style scoped>
.words-page {
  padding-top: 80px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
.word-table {
  width: 100%;
  border-collapse: collapse;
  background: #FFF;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #EEE;
}
th {
  background-color: #4A90E2;
  color: #FFF;
}
tr:hover {
  background-color: #F4F7FA;
}
.actions {
  display: flex;
  gap: 10px;
}
.action-link {
  color: #4A90E2;
  text-decoration: none;
  font-size: 14px;
}
.action-link:hover {
  text-decoration: underline;
}
.action-link.delete {
  color: #E74C3C;
}
</style>