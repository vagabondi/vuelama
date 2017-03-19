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
        <div class="col-xs-8 col-xs-offset-2">
          <div class="panel panel-primary">
            <div class="panel-heading">Zestaw 1</div>
            <div class="panel-body">
              <p>Opis</p>
            </div>
            <div class="list-group">
              <li class="list-group-item">Cwiczenie 1</li>
              <li class="list-group-item">Cwiczenie 2</li>
              <li class="list-group-item">Cwiczenie 3</li>
            </div>
            <button class="btn btn-primary center-block" style="margin-top: 20px; margin-bottom: 20px;">Edytuj</button>
          </div>
        </div>

        <form class="form-inline col-xs-12" style="margin-bottom: 30px;">
          <h3>Cele</h3>
          <div class="form-group">
            <label class="control-label">Czas</label>
            <input class="form-control" type="text" placeholder="Podaj w minutach">
          </div>
          <div class="form-group">
            <label class="control-label">Ciężar</label>
            <input class="form-control" type="number" placeholder="Podaj ilość w kg">
          </div>
        </form>
        <div class="col-xs-12">
          <button class="btn btn-primary center-block">Rozpocznij trening</button>
        </div>
      </div>
      <div class="col-xs-12" style="height: 1px; width: 100%; background-color: #000066;"></div>
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <h1>Trening</h1>
        <div class="row" style="margin-bottom: 20px;">
          <div class="col-xs-9">
            <label>Ciężar</label>
            <div class="progress">
              <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                60%
              </div>
            </div>
          </div>
          <div class="col-xs-3 text-center">
            <div class="col-xs-6">
              <label>Minuty</label>
              <div>20</div>
            </div>
            <div class="col-xs-6">
              <label>Sekundy</label>
              <div>34</div>
            </div>
          </div>
        </div>
        <div class="col-xs-8 col-xs-offset-2">
          <div class="panel panel-primary">
            <div class="panel-heading">Zestaw 1</div>
            <div class="list-group">
              <li class="list-group-item">Cwiczenie 1</li>
              <li class="list-group-item">Cwiczenie 2</li>
              <li class="list-group-item">Cwiczenie 3</li>
            </div>
          </div>
          <div class="col-xs-12">
            <button class="btn btn-primary center-block">Zakończ</button>
          </div>
        </div>
      </div>
      <div class="col-xs-12" style="height: 1px; width: 100%; background-color: #000066;"></div>
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <div class="modal fade bs-example-modal-sm in" style="display: none;" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div class="modal-dialog modal-md" role="document">
            <div class="modal-content" style="padding: 10px">
              <h4>Ćwiczenie 1</h4>
              <div class="col-xs-12">
                <div class="col-xs-2 text-center">Numer</div>
                <div class="col-xs-5 text-center">
                  Powtórzenia
                </div>
                <div class="col-xs-5 text-center">
                  Ciężar
                </div>
              </div>
              <div class="col-xs-12">
                <div class="col-xs-2 text-center">#1</div>
                <div class="col-xs-5">
                  <div class="input-group">
                    <span class="input-group-addon" style="background-color: green; color: #fff;"><i class="glyphicon glyphicon-plus"></i></span>
                    <input type="number" class="form-control text-center">
                    <span class="input-group-addon" style="background-color: red; color: #fff;"><i class="glyphicon glyphicon-minus"></i></span>
                  </div>
                </div>
                <div class="col-xs-5">
                  <div class="input-group">
                    <span class="input-group-addon" style="background-color: green; color: #fff;"><i class="glyphicon glyphicon-plus"></i></span>
                    <input type="number" class="form-control text-center">
                    <span class="input-group-addon" style="background-color: red; color: #fff;"><i class="glyphicon glyphicon-minus"></i></span>
                  </div>
                </div>
              </div>
              <div class="col-xs-12" style="margin-bottom: 10px; margin-top: 10px;">
                <div class="col-xs-2 text-center">#2</div>
                <div class="col-xs-5">
                  <div class="input-group">
                    <span class="input-group-addon" style="background-color: green; color: #fff;"><i class="glyphicon glyphicon-plus"></i></span>
                    <input type="number" class="form-control text-center">
                    <span class="input-group-addon" style="background-color: red; color: #fff;"><i class="glyphicon glyphicon-minus"></i></span>
                  </div>
                </div>
                <div class="col-xs-5">
                  <div class="input-group">
                    <span class="input-group-addon" style="background-color: green; color: #fff;"><i class="glyphicon glyphicon-plus"></i></span>
                    <input type="number" class="form-control text-center">
                    <span class="input-group-addon" style="background-color: red; color: #fff;"><i class="glyphicon glyphicon-minus"></i></span>
                  </div>
                </div>
              </div>
              <button class="btn btn-primary center-block">Dodaj serię</button>
            </div>
          </div>
        </div>
      </div>
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
    appAddTraining: AddTraining
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
