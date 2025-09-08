<template>
  <div class="preference-page">
    <div class="preference-content">
      <div class="progress-bar" v-if="currentStep > 0">
        <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
      </div>

      <!-- Step Title -->
      <div class="step-header">
        <button v-if="currentStep > 1" @click="goBack" class="back-btn">←</button>
        <h2 class="title">{{ currentQuestion.text }}</h2>
      </div>

      <!-- Options -->
      <div class="options-container">
        <div v-for="(option, index) in currentQuestion.options" :key="index" 
             class="option-card-guided" 
             :class="{ active: isSelected(option.value) }" 
             @click="selectOption(option)">
          <div class="option-icon-guided">{{ option.icon }}</div>
          <div class="option-text-guided">{{ option.text }}</div>
          <div v-if="option.description" class="option-description-guided">{{ option.description }}</div>
        </div>
      </div>

      <!-- Confirmation Step -->
      <div v-if="isConfirmationStep" class="confirmation-container">
        <div class="final-query">
          <p><strong>완성된 검색어:</strong></p>
          <p>{{ finalQuery }}</p>
        </div>
        <button @click="startRecommendation" class="recommend-btn">이대로 추천 받기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getRegionOptions } from '../utils/regionMapping';

// Import all the questions configuration
import questions from '../utils/guidedSearchQuestions';

export default {
  name: 'GuidedSearch',
  data() {
    return {
      questions: questions,
      currentStep: 1,
      userSelections: {},
      history: [],
      regionOptions: getRegionOptions(),
    };
  },
  computed: {
    currentQuestion() {
      let question = this.questions.steps[this.currentStep];
      if (question && question.isDynamic) {
        const previousAnswer = this.userSelections[question.dependsOn];
        return question.options[previousAnswer] || question;
      }
      return question;
    },
    isConfirmationStep() {
      return this.currentStep > Object.keys(this.questions.steps).length;
    },
    progressPercentage() {
      return (this.currentStep / (Object.keys(this.questions.steps).length + 1)) * 100;
    },
    finalQuery() {
      // Create a readable query string from selections
      return Object.values(this.userSelections).map(s => s.text).join(', ');
    }
  },
  methods: {
    selectOption(option) {
      this.history.push(this.currentStep);
      this.userSelections[this.currentQuestion.id] = { text: option.text, value: option.value };
      
      if (option.nextStep) {
        this.currentStep = option.nextStep;
      } else {
        this.currentStep++;
      }
    },
    goBack() {
      if (this.history.length > 0) {
        const previousStep = this.history.pop();
        // Clean up selection for the step we are leaving
        delete this.userSelections[this.questions.steps[this.currentStep].id];
        this.currentStep = previousStep;
      }
    },
    isSelected(value) {
      const selection = this.userSelections[this.currentQuestion.id];
      return selection && selection.value === value;
    },
    startRecommendation() {
      console.log("Final Selections:", this.userSelections);
      console.log("Final Query String:", this.finalQuery);
      // Add logic to call API and navigate to results page
      this.$router.push({ 
        path: '/recommend', 
        query: { guidedQuery: this.finalQuery }
      });
    }
  }
};
</script>

<style scoped>
/* Reusing styles from PreferenceInput.vue and SearchChooser.vue for consistency */
.preference-page { min-height: 100vh; background: #F7F8FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; display: flex; align-items: flex-start; justify-content: center; }
.preference-content { width: 100%; max-width: 720px; background: white; border-radius: 16px; padding: 40px 24px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); margin-top: 20px; }
.progress-bar { height: 8px; background-color: #e9ecef; border-radius: 4px; margin-bottom: 24px; overflow: hidden; }
.progress { height: 100%; background-color: #4A69E2; transition: width 0.3s ease; }
.step-header { display: flex; align-items: center; justify-content: center; position: relative; margin-bottom: 32px; }
.back-btn { position: absolute; left: 0; background: none; border: none; font-size: 24px; cursor: pointer; color: #495057; padding: 0 10px; }
.title { font-size: 24px; font-weight: 700; color: #212529; text-align: center; margin: 0; }
.options-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
.option-card-guided { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); cursor: pointer; transition: all 0.2s ease; border: 2px solid #e9ecef; text-align: center; }
.option-card-guided:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }
.option-card-guided.active { border-color: #4A69E2; background-color: #F1F4FE; box-shadow: 0 6px 16px rgba(74, 105, 226, 0.2); }
.option-icon-guided { font-size: 36px; margin-bottom: 12px; }
.option-text-guided { font-size: 16px; font-weight: 600; color: #343a40; }
.option-description-guided { font-size: 13px; color: #6c757d; margin-top: 8px; }
.confirmation-container { margin-top: 32px; text-align: center; padding: 24px; background: #F8F9FA; border-radius: 12px; }
.final-query { margin-bottom: 24px; font-size: 16px; color: #495057; }
.recommend-btn { width: 100%; max-width: 300px; margin: 0 auto; padding: 16px; background: #4A69E2; color: white; font-size: 16px; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; }
.recommend-btn:hover { background: #3B5BC7; }
</style>