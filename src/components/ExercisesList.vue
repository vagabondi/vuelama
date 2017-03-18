<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" v-for="exercise in exercises">{{ exercise.name }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            exercises: {
                type: Array
            }
        }
    }
</script>

<style>

</style>