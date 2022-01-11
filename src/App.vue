<template>
  <div id="app">
    <!-- <manage-page></manage-page> -->
    <router-view></router-view>
  </div>
</template>

<script>
    import ManagePage from './components/ManagePage.vue'

    export default {
        name: 'App',
        components: {
            ManagePage
        }
    }
</script>

<style>

</style>
