<template>
    <form>
        <div class="form-group">
            <label class="text-white">Nazwa ćwiczenia</label>
            <input class="form-control" type="text" v-model="name" @enter="addNew">
            <button class="btn btn-primary" @click.prevent="addNew">Dodaj</button>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                name: ''
            }
        },
        methods: {
            addNew() {
                this.$emit('addedNewEx', this.name)
                this.name = ''
            }
        }
    }
</script>

<style lang="scss">

</style>
