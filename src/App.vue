<template>
  <div id="app">
    <rating
      :rateState="2"
      :disabled="false"
      @value="(val) => rate = val"
      :starFill="'orange'"
      :starStroke="'orange'"
    />
    <h3> Rating is: {{this.rate}} </h3>
  </div>
</template>

<script>
import Rating from '@/components/Rating/Rating.vue'
export default {
  name: 'App',
  components: {
    Rating
  },
  data(){
    return{
      rate: null
    }
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
