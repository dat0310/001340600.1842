<template>
  <div class="edit-page">
    <Navbar />
    <div class="container">
      <h1>Edit Word</h1>
      <WordForm :word="word" @createOrUpdate="createOrUpdate" />
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/api';
import Navbar from '../components/Navbar.vue';
import WordForm from '../components/WordForm.vue';

export default {
  name: 'EditWord',
  components: { Navbar, WordForm },
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
  },
  methods: {
    async createOrUpdate(word) {
      try {
        const updatedWord = { ...word, _id: this.$route.params.id };
        await api.updateWord(updatedWord);
        console.log('Word updated successfully!');
        this.$router.push(`/words/${updatedWord._id}`);
      } catch (error) {
        console.error('Error updating word:', error);
      }
    }
  }
};
</script>

<style scoped>
.edit-page {
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