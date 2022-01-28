<template>
  <div id="app">
    <div class="main-item-wrapper">
      <rating
        :rateState="2"
        :disabled="false"
        @value="(val) => rate = val"
        :starFill="'orange'"
        :starStroke="'orange'"
      />
      <h3> Rating is: {{this.rate}} </h3>
    </div>
    <div class="main-item-wrapper">
      <custom-drop-down
        :data="list"
        :withIndex="true"
        @select="(val) => listItem = val"
        :placeholder="'Select Item List'"
        :darkTheme="false"
        :withCheckBox="true"
        :multiSelect="true"
        :selecteditem="null"
        :selectedItems="[2,3,5,6,7,1]"
      />
      <h3>Selected ItemId: {{listItem}}</h3>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating/Rating.vue'
import CustomDropDown from './components/CustomDropdown/CustomDropDown.vue'
export default {
  name: 'App',
  components: {
    Rating,
    CustomDropDown
  },
  data(){
    return{
      rate: null,
      listItem: null,
    }
  },
  computed:{
    list(){
      let arr = []

      for (let i=0;i <= 250; i++){
        let obj = {
          title: `item-${i}`,
          value: i
        }
        arr.push(obj)
      }
      return arr
    }
  },
}
</script>

<style lang="scss">

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

}
.main-item-wrapper{
  border-bottom: 0.0625rem solid rgba(#3d3d3d, .1);
  padding-bottom: 1rem;
  min-height: 12.5rem;
  display: grid;
  place-items: center;

  &:first-child{
    text-align: center;
  }
  
}
</style>
