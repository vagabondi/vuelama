<template>
    <div class="modal fade bs-example-modal-sm in" :style="{display: show}" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content" style="padding: 10px">
                <h4>{{ exercise.name }}</h4>
                <div class="col-xs-12">
                    <div class="col-xs-2 text-center">Numer</div>
                    <div class="col-xs-5 text-center">
                        Powtórzenia
                    </div>
                    <div class="col-xs-5 text-center">
                        Ciężar
                    </div>
                </div>
                <div class="col-xs-12" v-for="(set, index) in exercise.sets">
                    <div class="col-xs-2 text-center">#{{ index + 1 }}</div>
                    <div class="col-xs-5">
                        <div class="input-group">
                            <span class="input-group-addon" @click="increase(set, 'reps')" style="background-color: green; color: #fff;"><i class="glyphicon glyphicon-plus"></i></span>
                            <input type="number" class="form-control text-center" v-model="set.reps">
                            <span class="input-group-addon" @click="decrease(set, 'reps')" style="background-color: red; color: #fff;"><i class="glyphicon glyphicon-minus"></i></span>
                        </div>
                    </div>
                    <div class="col-xs-5">
                        <div class="input-group">
                            <span class="input-group-addon" @click="increase(set, 'weight')" style="background-color: green; color: #fff;"><i class="glyphicon glyphicon-plus"></i></span>
                            <input type="number" class="form-control text-center" v-model="set.weight">
                            <span class="input-group-addon" @click="decrease(set, 'weight')" style="background-color: red; color: #fff;"><i class="glyphicon glyphicon-minus"></i></span>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary center-block" @click="addNewSet">Dodaj serię</button>
                <button class="btn btn-primary center-block" @click="closeModal">Zapisz</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../main'

    export default {
        data () {
            return {
                exercise: {},
                exerciseId: null,
                show: 'none'
            }
        },
        created () {
            eventBus.$on('modalWasOpened', (data) => {
                this.exercise = data.exercise
                this.exerciseId = data.index
                this.show = 'block'
            })
        },
        methods: {
            addNewSet () {
                this.exercise.sets.push({reps: 0, weight: 0})
            },
            increase (exerciseSet, type) {
                if (type === 'reps') {
                    exerciseSet.reps++
                } else if (type === 'weight') {
                    exerciseSet.weight++
                }
            },
            decrease (exerciseSet, type) {
                if (type === 'reps') {
                    exerciseSet.reps--
                } else if (type === 'weight') {
                    exerciseSet.weight--
                }
            },
            closeModal () {
                this.show = 'none'
                eventBus.updateTraining({exercise: this.exercise, index: this.exerciseId})
            }
        }
    }
</script>