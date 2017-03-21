import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes,
  mode: 'hash'
})

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
    }
  }
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
