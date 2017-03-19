<template>
    <div class="col-xs-8 col-xs-offset-2">
        <div class="panel panel-primary">
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label class="control-label">Nazwa</label>
                        <input class="form-control" v-model="training.name">
                    </div>
                    <div class="form-group">
                        <label class="control-label">Opis</label>
                        <textarea class="form-control" rows="3" v-model="training.description"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Ćwiczenia</label>
                        <div v-for="exercise in training.exercises">
                            <input class="form-control" v-model="exercise.name">
                        </div>
                        <input class="form-control" v-model="newExercise">
                        <button class="btn btn-primary" @click.prevent="addNewExercise">Dodaj ćwiczenie</button>
                    </div>
                    <button class="center-block btn btn-primary" type="submit" @click.prevent="addNewTraining">Zapisz</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            trainingId: Number
        },
        data () {
            return {
                training: {
                    id: this.trainingId,
                    name: '',
                    description: '',
                    exercises: [
                    ]
                },
                newExercise: ''
            }
        },
        methods: {
            addNewTraining () {
                this.$emit('trainingWasAdded', this.training)
            },
            addNewExercise () {
                this.training.exercises.push({name: this.newExercise})
                this.newExercise = ''
            }
        },
    }
</script>

<style lang="css">

</style>
