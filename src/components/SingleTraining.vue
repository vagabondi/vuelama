<template>
    <div class="col-xs-6">
        <div class="panel panel-primary">
            <div class="panel-heading">{{ training.name }}</div>
            <div class="panel-body">
                <p>{{ training.description }}</p>
                <button class="btn btn-primary" @click="setTraining">Wybierz</button>
                <button class="btn btn-primary" @click="edit">Edytuj</button>
                <button class="btn btn-primary" @click="deleteTraining">Usuń</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../main'

    export default {
        props: {
            training: {
                type: Object,
                required: true
            }
        },
        methods: {
            edit () {
                this.$emit('editTraining', this.training.id)
            },
            deleteTraining () {
                this.$emit('deleteTraining', this.training.id)
            },
            setTraining () {
                eventBus.setTraining(this.training)
                eventBus.changePage('start')
            }
        }
    }
</script>

<style lang="css">

</style>
