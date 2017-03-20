<template>
  <div class="wrapper" style="background-color: #ffd700; overflow: hidden;">
    <div class="containter">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <h1>Home</h1>
        <app-single-training
                v-for="training in trainings"
                :key="training.id"
                :training="training"
                @editTraining="setTrainingToEdit($event)"
                @deleteTraining="deleteTraining($event)"
        ></app-single-training>
        <div class="col-xs-12">
          <button class="btn btn-primary center-block" @click="addingNew = true">Dodaj nowy</button>
        </div>
      </div>
      <div class="col-xs-12" style="height: 1px; width: 100%; background-color: #000066;"></div>
      <div class="col-xs-12 col-sm-8 col-sm-offset-2"  v-if="!(Object.keys(trainingToEdit).length === 0 && trainingToEdit.constructor === Object)">
        <h1>Edit</h1>
        <app-edit-training :training="trainingToEdit" @trainingWasEdited="editTraining($event)"></app-edit-training>
      </div>
      <div class="col-xs-12" style="height: 1px; width: 100%; background-color: #000066;"></div>
      <div class="col-xs-12 col-sm-8 col-sm-offset-2" v-if="addingNew">
        <h1>Add new</h1>
        <app-add-training :trainingId="newTrainingId" @trainingWasAdded="addNewTraining($event)"></app-add-training>
      </div>
      <div class="col-xs-12" style="height: 1px; width: 100%; background-color: #000066;"></div>
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <h1>Start</h1>
        <app-start-training></app-start-training>
      </div>
      <div class="col-xs-12" style="height: 1px; width: 100%; background-color: #000066;"></div>
      <app-workout></app-workout>

      <div class="col-xs-12" style="height: 1px; width: 100%; background-color: #000066;"></div>
      <app-exercise-modal></app-exercise-modal>
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <h1>Podsumowanie</h1>
        <table class="table table-bordered table-hover text-center" style="background-color: #fff; max-width: 600px; margin: 20px auto">
          <thead>
          <tr>
            <th>Ćw</th>
            <th>Powtórzenia</th>
            <th>Ciężar łącznie</th>
            <th>Max</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>Ćwiczenie 1</th>
            <td>24</td>
            <td>300kg</td>
            <td>30kg</td>
          </tr>
          <tr>
            <th>Ćwiczenie 2</th>
            <td>40</td>
            <td>400kg</td>
            <td>20kg</td>
          </tr>
          <tr>
            <th>Ćwiczenie 3</th>
            <td>8</td>
            <td>100kg</td>
            <td>10kg</td>
          </tr>
          </tbody>
        </table>
        <div class="alert alert-danger center-block" role="alert" style="max-width: 400px;">
          <b>Cel: </b>80% - słabo!
        </div>
        <div class="alert alert-success center-block" role="alert" style="max-width: 400px;">
          <b>Czas: </b>40 minut - lepiej niż założyłeś, nice!
        </div>
        <button class="btn btn-primary center-block">Wróć do strony głównej</button>
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

export default {
  data () {
    return {
      trainings,
      trainingToEdit: {},
      addingNew: false
    }
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
    appExerciseModal: ExerciseModal
  },
  methods: {
    setTrainingToEdit (trainingId) {
      this.trainingToEdit = this.trainings.find(training => training.id === trainingId)
    },
    editTraining (editedTraining) {
      this.trainingToEdit = {}
    },
    deleteTraining (id) {
      let index = this.trainings.findIndex(training => training.id === id)
      this.trainings.splice(index, 1)
    },
    addNewTraining (data) {
      this.trainings.push(data)
      this.addingNew = false
    }
  }
}
</script>

<style lang="css">

</style>
