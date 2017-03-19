<template>
    <div class="col-xs-8 col-xs-offset-2">
        <div class="panel panel-primary">
            <div class="panel-heading">{{ editedTraining.name }}</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label class="control-label">Opis</label>
                        <textarea class="form-control" rows="3" v-model="editedTraining.description"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Ćwiczenia</label>
                        <div v-for="exercise in editedTraining.exercises">
                            <input class="form-control" v-model="exercise.name">
                        </div>
                        <input class="form-control" v-model="newExercise">
                        <button class="btn btn-primary" @click.prevent="addNewExercise">Dodaj ćwiczenie</button>
                    </div>
                    <button class="center-block btn btn-primary" type="submit" @click.prevent="editTraining">Zapisz</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            training: Object
        },
        data () {
            return {
                editedTraining: this.training,
                newExercise: ''
            }
        },
        methods: {
            editTraining () {
                this.$emit('trainingWasEdited', this.editedTraining)
            },
            addNewExercise () {
                this.editedTraining.exercises.push({name: this.newExercise})
                this.newExercise = ''
            }
        }
    }
</script>

<style lang="css">

</style>
