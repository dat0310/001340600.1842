<template>
  <div class="test-page">
    <Navbar />
    <div class="container">
      <h1>Test</h1>
      <div v-if="words.length < 5" class="error-message">
        You need to enter at least five words to begin the test
      </div>
      <VocabTest v-else :words="words" />
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/api';
import Navbar from '../components/Navbar.vue';
import VocabTest from '../components/VocabTest.vue';

export default {
  name: 'Test',
  components: { Navbar, VocabTest },
  data() {
    return {
      words: []
    };
  },
  async mounted() {
    try {
      this.words = await api.getWords();
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  }
};
</script>

<style scoped>
.test-page {
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
.error-message {
  color: #E74C3C;
  background: #F8E1E1;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
</style>