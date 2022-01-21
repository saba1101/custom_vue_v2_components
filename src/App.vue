<template>
  <div id="app">
    <rating
      :rateState="3"
      :disabled="true"
    />
  </div>
</template>

<script>
import Rating from '@/components/Rating/Rating.vue'
export default {
  name: 'App',
  components: {
    Rating
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
