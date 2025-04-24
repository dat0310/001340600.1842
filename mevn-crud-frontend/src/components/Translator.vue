<template>
  <div class="translator-page">
    <Navbar />
    <div class="container">
      <h1>Translator</h1>
      <div class="translator-form">
        <div class="input-group">
          <select v-model="sourceLanguage">
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="fr">French</option>
          </select>
          <input type="text" v-model="text" placeholder="Enter word..." />
        </div>
        <div class="input-group">
          <select v-model="targetLanguage">
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="fr">French</option>
          </select>
          <input type="text" :value="translatedText" placeholder="Translated word..." readonly />
        </div>
        <button class="btn btn-primary" @click="translateText" :disabled="loading">
          {{ loading ? 'Translating...' : 'Translate' }}
        </button>
        <div v-if="error" class="error-message">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/api';
import Navbar from './Navbar.vue';

export default {
  components: { Navbar },
  data() {
    return {
      text: '',
      sourceLanguage: 'en',
      targetLanguage: 'de',
      translatedText: '',
      error: null,
      loading: false
    };
  },
  methods: {
    async translateText() {
      if (!this.text.trim()) {
        this.error = 'Please enter some text to translate.';
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        this.translatedText = await api.translateWord(this.text, this.sourceLanguage, this.targetLanguage);
      } catch (err) {
        this.translatedText = '';
        this.error = err.response?.data?.message || 'Failed to translate word. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.translator-page {
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
.translator-form {
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
  gap: 10px;
}
select, input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #CCC;
  border-radius: 5px;
  outline: none;
}
select:focus, input:focus {
  border-color: #4A90E2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
}
input[readonly] {
  background: #F0F0F0;
}
.btn {
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-primary {
  background-color: #4A90E2;
  color: #FFF;
}
.btn-primary:hover:not(:disabled) {
  background-color: #357ABD;
}
.btn-primary:disabled {
  background-color: #A0C4FF;
  cursor: not-allowed;
}
.error-message {
  color: #E74C3C;
  background: #F8E1E1;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
</style>