<template>
    <div>
        <h1>Trainings</h1>
        <app-single-training
            v-for="training in trainings"
            :key="training.id"
            :training="training"
            ></app-single-training>
        <div class="col-xs-12">
            <button class="btn btn-primary center-block">Dodaj nowy</button>
        </div>
    </div>
</template>

<script>
    import trainings from '../mock'
    import SingleTraining from '../components/SingleTraining.vue'

    export default {
        data () {
            return {
                trainings
            }
        },
        components: {
            appSingleTraining: SingleTraining
        }
    }
</script>