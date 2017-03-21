<template>
  <div class="wrapper">
    <div class="containter">
      <!--<transition name="homebox" enter-active-class="comingin" type="animation">-->
        <!--<div class="col-xs-12 col-sm-8 col-sm-offset-2" v-show="page === 'home'">-->
            <!--<h1>Home</h1>-->
          <!--<transition-group name="slide" mode="out-in">-->
            <!--<app-single-training-->
                    <!--v-for="training in trainings"-->
                    <!--:key="training.id"-->
                    <!--:training="training"-->
                    <!--@editTraining="setTrainingToEdit($event)"-->
                    <!--@deleteTraining="deleteTraining($event)"-->
            <!--&gt;</app-single-training>-->
          <!--</transition-group>-->

          <!--<div class="col-xs-12">-->
            <!--<button class="btn btn-primary center-block" @click="page = 'add'">Dodaj nowy</button>-->
          <!--</div>-->
        <!--</div>-->
      <!--</transition>-->
      <!--<transition name="slide" type="animation">-->
        <!--<div class="col-xs-12 col-sm-8 col-sm-offset-2"  v-show="!(Object.keys(trainingToEdit).length === 0 && trainingToEdit.constructor === Object) && page === 'edit'">-->
          <!--<h1>Edit</h1>-->
          <!--<app-edit-training :training="trainingToEdit" @trainingWasEdited="editTraining($event)"></app-edit-training>-->
        <!--</div>-->
      <!--</transition>-->

      <!--<div class="col-xs-12 col-sm-8 col-sm-offset-2" v-show="page === 'add'">-->
        <!--<h1>Add new</h1>-->
        <!--<app-add-training :trainingId="newTrainingId" @trainingWasAdded="addNewTraining($event)"></app-add-training>-->
      <!--</div>-->

      <!--<transition name="slide" type="animation">-->
        <!--<app-start-training v-show="page === 'start'"></app-start-training>-->
      <!--</transition>-->

      <!--<app-workout v-show="page === 'workout'"></app-workout>-->

      <!--<app-exercise-modal></app-exercise-modal>-->

      <!--<app-summary v-show="page === 'summary'"></app-summary>-->
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
import trainings from './mock'
import _ from 'lodash'
import SingleTraining from './components/SingleTraining.vue'
import EditTraining from './components/EditTraining.vue'
import AddTraining from './components/AddTraining.vue'
import StartTraining from './components/StartTraining.vue'
import Workout from './components/Workout.vue'
import ExerciseModal from './components/ExerciseModal.vue'
import Summary from './components/Summary.vue'
import { eventBus } from './main'

export default {
  data () {
    return {
      trainings,
      trainingToEdit: {},
      addingNew: false,
      page: 'home'
    }
  },
  created () {
    eventBus.$on('pageWasChanged', (data) => {
      this.page = data
    })
  },
  computed: {
    newTrainingId () {
      let latestTraining = _.maxBy(this.trainings, 'id')
      return latestTraining.id + 1
    }
  },
  components: {
    appSingleTraining: SingleTraining,
    appEditTraining: EditTraining,
    appAddTraining: AddTraining,
    appStartTraining: StartTraining,
    appWorkout: Workout,
    appExerciseModal: ExerciseModal,
    appSummary: Summary
  },
  methods: {
    setTrainingToEdit (trainingId) {
      this.trainingToEdit = this.trainings.find(training => training.id === trainingId)
      this.page='edit'
    },
    editTraining (editedTraining) {
      this.trainingToEdit = {}
      this.page = 'home'
    },
    deleteTraining (id) {
      let index = this.trainings.findIndex(training => training.id === id)
      this.trainings.splice(index, 1)
    },
    addNewTraining (data) {
      this.trainings.push(data)
      this.page = 'home'
    }
  }
}
</script>



















<style lang="css">
  .wrapper {
    background-color: #ffd700;
    overflow: hidden;
    min-height: 100vh;
  }

  .slide-enter {
    opacity: 0;
  }
  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity .5s;
  }
  /*.slide-leave {*/
    /*opacity: 0;*/
  /*}*/
  /*.slide-leave-active {*/
    /*animation: slide-out 1s ease-out forwards;*/
    /*transition: opacity 1s;*/
  /*}*/
  .slide-move {
    transition: transform 1s;
  }

  .lettersIn-enter {
    letter-spacing: 2em;
    opacity: 0;
  }

  .lettersIn-enter-active {
    animation: tracking-in-contract 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  }

  .homebox-enter {
    opacity: 0;
  }

  @keyframes slide-in {
    from {
      transform: translateY(50px);
    }
    to {
      transform: translateY(0)
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(50px)
    }
  }
  @keyframes tracking-in-contract {
    0% {
      letter-spacing: 2em;
      opacity: 0;
    }
    40% {
      opacity: 0.6;
    }
    100% {
      letter-spacing: normal;
      opacity: 1;
    }
  }

  @keyframes slide-in-fwd-center {
    0% {
      transform: translateZ(-1400px);
    }
    100% {
      transform: translateZ(0);
    }
  }
</style>
