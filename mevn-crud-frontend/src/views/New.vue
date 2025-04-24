<template>
  <div class="new-page">
    <Navbar />
    <div class="container">
      <h1>New Word</h1>
      <WordForm @createOrUpdate="createOrUpdate" />
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/api';
import Navbar from '../components/Navbar.vue';
import WordForm from '../components/WordForm.vue';

export default {
  name: 'NewWord',
  components: { Navbar, WordForm },
  methods: {
    async createOrUpdate(word) {
      try {
        const res = await api.createWord(word);
        console.log('Word created successfully!');
        this.$router.push(`/words/${res._id}`);
      } catch (error) {
        console.error('Error creating word:', error);
      }
    }
  }
};
</script>

<style scoped>
.new-page {
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
</style>