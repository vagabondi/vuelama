<template>
    <div>
        <h2 class="text-white">{{ exercise.name }}</h2>
        <div v-if="exercise.sets.length > 0 || active">
            <ul class="list-group" >
                <li class="list-group-item row" v-for="set in exercise.sets">
                    <div class="col-sm-6">Powtórzenia: {{ set.reps }}</div>
                    <div class="col-sm-6">Ciężar: {{ set.weight }}</div>
                </li>
            </ul>
            <form>
                <div class="form-group">
                    <div class="col-xs-6">
                        <label class="text-white">Liczba powtórzeń</label>
                        <input class="form-control" type="number" v-model="newSet.reps">
                    </div>
                    <div class="col-xs-6">
                        <label class="text-white">Ciężar</label>
                        <input class="form-control" type="number" v-model="newSet.weight">
                    </div>
                    <button class="btn btn-primary" @click.prevent="addSet">Dodaj serie</button>
                </div>
            </form>
        </div>

        <div class="list-group-item row" v-if="exercise.sets.length === 0 && !active">
            Nie masz żadnych serii.
            <button class="btn btn-primary" @click="startExercise">Rozpocznij</button>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../main'

    export default {
        props: ['exercise'],
        data() {
            return {
                active: false,
                newSet: {
                    reps: 0,
                    weight: 0
                }
            }
        },
        mounted() {
            if(this.exercise.sets.length > 0) {
                this.active = true
            }
        },
        methods: {
            startExercise() {
                this.active = true
            },
            addSet() {
                eventBus.$emit('addedNewSet', this.newSet)
                this.newSet.reps = 0
                this.newSet.weight = 0
                console.log('poszło')
            }
        }
    }
</script>

<style>

</style>