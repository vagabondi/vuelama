import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue({
  methods: {
    setTraining (training) {
      this.$emit('trainingWasSetted', training)
    },
    openExerciseModal (data) {
      this.$emit('modalWasOpened', data)
    },
    updateTraining (data) {
      this.$emit('exerciseWasUpdated', data)
    },
    changePage (data) {
      this.$emit('pageWasChanged', data)
    },
    getSummary (data) {
      this.$emit('endOfWorkout', data)
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
