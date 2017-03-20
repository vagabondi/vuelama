<template>
    <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <h1>Trening</h1>
        <div class="row" style="margin-bottom: 20px;">
            <div class="col-xs-9">
                <label>Ciężar</label>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="{width: (currentWeight/weight)*100 + '%'}">
                        {{ (currentWeight/weight)*100 }}%
                    </div>
                </div>
            </div>
            <div class="col-xs-3 text-center">
                <div class="col-xs-6">
                    <label>Minuty</label>
                    <div>{{ currentTime.minutes }}</div>
                </div>
                <div class="col-xs-6">
                    <label>Sekundy</label>
                    <div>{{ currentTime.seconds }}</div>
                </div>
            </div>
        </div>
        <div class="col-xs-8 col-xs-offset-2">
            <div class="panel panel-primary">
                <div class="panel-heading" v-if="training.name">{{ training.name }}</div>
                <div class="list-group">
                    <li class="list-group-item" v-for="(exercise, index) in training.exercises" @click="openModal(exercise, index)">{{ exercise.name }}</li>
                </div>
            </div>
            <div class="col-xs-12">
                <button class="btn btn-primary center-block">Zakończ</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../main'
    import _ from 'lodash'

    export default {
        data () {
            return {
                training: {},
                weight: 0,
                time: 0,
                currentTime: {
                    minutes: 0,
                    seconds: 0
                },
                isStarted: false,
                currentWeight: 0
            }
        },
        created () {
            eventBus.$on('trainingWasStarted', (data) => {
                this.training = data.training
                this.weight = Number(data.weight)
                this.time = data.time
                this.isStarted = true
            })
            eventBus.$on('exerciseWasUpdated', (data) => {
                this.training.exercises[data.index] = data.exercise
                this.getCurrentWeight()
            })
        },
        watch: {
            isStarted: function () {
                if(this.isStarted) {
                    setInterval(() => {
                        this.currentTime.seconds++
                        if(this.currentTime.seconds === 60 ) {
                            this.currentTime.seconds = 0
                            this.currentTime.minutes++
                        }
                    }, 1000)
                }
            }
        },
        methods: {
            openModal (exercise, index) {
                eventBus.openExerciseModal({exercise, index})
            },
            getCurrentWeight () {
                if(this.weight > 0) {
                    let sum = 0;
                    const len = this.training.exercises.length
                    for(let i=0; i<len; i++) {
                        let exerciseSets = this.training.exercises[i].sets
                        for (let j=0; j<exerciseSets.length; j++) {
                            sum += exerciseSets[j].weight * exerciseSets[j].reps
                        }
                    }
                    this.currentWeight = sum
                }
            }
        }
    }
</script>

<style scoped>
    .list-group-item {
        cursor: pointer;
    }
    .list-group-item:hover {
        background-color: #ffc520;
    }
</style>