<template>
  <div>
    <app-header></app-header>
    <main class="main-content">
      <div class="container ">
        <div class="col-xs-12 col-sm-4 col-md-4">
          <app-exercises-list :exercises="initList"></app-exercises-list>
        </div>
        <div class="col-xs-12 col-sm-8 col-md-8">
          <app-new-exercise @addedNewEx="addNewExercise($event)"></app-new-exercise>
          <app-exercise v-for="(exercise, index) in initList" :exercise="exercise" @addedNewSet="addNewSetToExercise($event)"></app-exercise>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NewExercise from './components/NewExercise.vue'
import Exercise from './components/Exercise.vue'
import ExercisesList from './components/ExercisesList.vue'
import Header from './shared/Header.vue'
import eventBus from './main'

export default {
  data() {
    return {
      initList: [
        {
          name: 'bicek',
          sets: [
            {reps: 12, weight: 8},
            {reps: 10, weight: 10},
            {reps: 8, weight: 12}
          ]
        },
        {
          name: 'klata',
          sets: [
            {reps: 12, weight: 40},
            {reps: 10, weight: 45},
            {reps: 8, weight: 50}
          ]
        }
      ]
    }
  },
  mounted() {
    eventBus.$on('addedNewSet', data => {
      console.log(data)
    });
  },
  methods: {
    addNewExercise(name) {
      this.initList.push(
        {
          name,
          sets: []
        }
      )
    },
    addNewSetToExercise(event) {
      console.log('wykonało się')
      this.initList[index].sets.push(event)
    }
  },
  components: {
    appExercise: Exercise,
    appNewExercise: NewExercise,
    appExercisesList: ExercisesList,
    appHeader: Header
  }
}
</script>

<style lang="css">
  .main-content {
    padding-top: 70px;
    padding-bottom: 50px;
    background-color: #014e0e;
    min-height: 100vh;
  }
  .text-white {
    color: #fff;
  }

</style>
