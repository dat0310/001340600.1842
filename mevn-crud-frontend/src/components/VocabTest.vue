<template>
  <div class="test-container">
    <h2>Score: {{ score }} / {{ words.length }}</h2>
    <form @submit.prevent="onSubmit" class="test-form">
      <div class="input-group">
        <label>English</label>
        <input type="text" v-model="english" :disabled="testOver" placeholder="Enter word..." />
      </div>
      <div class="input-group">
        <label>German</label>
        <input type="text" readonly :disabled="testOver" :value="currWord.german" />
      </div>
      <div class="input-group">
        <label>French</label>
        <input type="text" readonly :disabled="testOver" :value="currWord.french" />
      </div>
      <button type="submit" class="btn btn-primary" :disabled="testOver">Submit</button>
    </form>
    <p :class="['result', resultClass]" v-html="result"></p>
  </div>
</template>

<script>
export default {
  name: 'VocabTest',
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      randWords: [...this.words].sort(() => 0.5 - Math.random()),
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      english: '',
      score: 0,
      testOver: false
    };
  },
  computed: {
    currWord() {
      return this.randWords.length ? this.randWords[0] : {};
    }
  },
  methods: {
    onSubmit() {
      if (this.english.toLowerCase() === this.currWord.english.toLowerCase()) {
        this.flash('Correct!', 'success');
        this.score += 1;
      } else {
        this.flash('Wrong!', 'error');
        this.incorrectGuesses.push(this.currWord.german);
      }
      this.english = '';
      this.randWords.shift();
      if (!this.randWords.length) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults() {
      if (!this.incorrectGuesses.length) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = 'error';
      }
    },
    flash(message, type) {
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }
};
</script>

<style scoped>
.test-container {
  max-width: 600px;
  margin: 80px auto 20px;
  padding: 20px;
  background: #FFF;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
.test-form {
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
input:disabled {
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
.result {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}
.success {
  background-color: #DFF0D8;
  color: #3C763D;
}
.error {
  background-color: #F2DEDE;
  color: #A94442;
}
</style>