<template>
  <form @submit.prevent="onSubmit" class="word-form">
    <div class="input-group">
      <label>English</label>
      <input type="text" v-model="localWord.english" placeholder="Enter word..." />
    </div>
    <div class="input-group">
      <label>German</label>
      <input type="text" v-model="localWord.german" placeholder="Enter word..." />
    </div>
    <div class="input-group">
      <label>French</label>
      <input type="text" v-model="localWord.french" placeholder="Enter word..." />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <div v-if="errorsPresent" class="error-message">{{ errorMessage }}</div>
  </form>
</template>

<script>
export default {
  name: 'WordForm',
  props: {
    word: {
      type: Object,
      default: () => ({
        english: '',
        german: '',
        french: ''
      })
    }
  },
  data() {
    return {
      localWord: { ...this.word },
      errorsPresent: false,
      errorMessage: ''
    };
  },
  watch: {
    word(newWord) {
      this.localWord = { ...newWord };
    }
  },
  methods: {
    async onSubmit() {
      if (!this.localWord.english || !this.localWord.german || !this.localWord.french) {
        this.errorsPresent = true;
        this.errorMessage = 'Please fill out all fields!';
        return;
      }
      this.errorsPresent = false;
      this.errorMessage = '';
      this.$emit('createOrUpdate', { ...this.localWord });
    }
  }
};
</script>

<style scoped>
.word-form {
  max-width: 500px;
  margin: 0 auto;
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
  outline: none;
}
input:focus {
  border-color: #4A90E2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
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
.btn-primary:hover {
  background-color: #357ABD;
}
.error-message {
  color: #E74C3C;
  background: #F8E1E1;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
</style>