<template>
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
            <tr v-for="exercise in training.exercises">
                <th>{{ exercise.name }}</th>
                <td>{{ exerciseReps(exercise) }}</td>
                <td>{{ exerciseWeight(exercise) }}kg</td>
                <td>{{ exerciseMax(exercise) }}kg</td>
            </tr>
            </tbody>
        </table>
        <div class="alert alert-danger center-block" role="alert" style="max-width: 400px;">
            <b>Cel: </b>{{ goal }}% - {{ goalMessage }}!
        </div>
        <div class="alert alert-success center-block" role="alert" style="max-width: 400px;">
            <b>Czas: </b>40 minut - lepiej niż założyłeś, nice!
        </div>
        <button class="btn btn-primary center-block" @click="backToHomepage">Wróć do strony głównej</button>
    </div>
</template>

<script>
    import { eventBus } from '../main'

    export default {
        data () {
            return {
                training: {},
                goal: 0
            }
        },
        created() {
            eventBus.$on('endOfWorkout', (data) => {
                this.training = data.training
                this.goal = data.goal
            })
        },
        computed: {
            goalMessage: function () {
                if (this.goal <= 10) {
                    return 'Słabo!!!'
                }
                return "Nieźle!"
            }
        },
        methods: {
            backToHomepage () {
                eventBus.changePage('home')
            },
            exerciseWeight (exercise) {
                let sum = 0
                _.forEach(exercise.sets, (exerciseSet) => {
                    sum += Number(exerciseSet.weight)
                })
                return sum
            },
            exerciseReps (exercise) {
                let sum = 0
                _.forEach(exercise.sets, (exerciseSet) => {
                    sum += Number(exerciseSet.reps)
                })
                return sum
            },
            exerciseMax (exercise) {
                let max = _.maxBy(exercise.sets, 'weight')
                if (max !== undefined) {
                    return max.weight
                }
                return 0

            }
        }
    }
</script>
