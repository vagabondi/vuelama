<template>
    <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <h1>Start</h1>
        <div class="col-xs-8 col-xs-offset-2">
            <div class="panel panel-primary">
                <div class="panel-heading">{{ training.name }}</div>
                <div class="panel-body">
                    <p>{{ training.description }}</p>
                </div>
                <div class="list-group">
                    <li class="list-group-item" v-for="exercise in training.exercises">{{ exercise.name }}</li>
                </div>
                <button class="btn btn-primary center-block" style="margin-top: 20px; margin-bottom: 20px;">Edytuj</button>
            </div>
            <form class="form-inline col-xs-12" style="margin-bottom: 30px;">
                <h3>Cele</h3>
                <div class="form-group">
                    <label class="control-label">Czas</label>
                    <input class="form-control" type="text" v-model="time" placeholder="Podaj w minutach">
                </div>
                <div class="form-group">
                    <label class="control-label">Ciężar</label>
                    <input class="form-control" type="number" v-model="weight" placeholder="Podaj ilość w kg">
                </div>
            </form>
            <div class="col-xs-12">
                <button class="btn btn-primary center-block" @click="startTraining">Rozpocznij trening</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../main'

    export default {
        data () {
            return {
                training: {
                    id: null,
                    name: '',
                    description: '',
                    exercises: []
                },
                weight: '',
                time: ''
            }

        },
        created () {
            eventBus.$on('trainingWasSetted', (data) => {
                this.training = data
                this.page = 'start'
            })
        },
        methods: {
            startTraining () {
                eventBus.$emit('trainingWasStarted', {
                    training: this.training,
                    weight: this.weight,
                    time: this.time,
                })
                eventBus.changePage('workout')
            }
        }
    }
</script>

<style lang="css">

</style>
