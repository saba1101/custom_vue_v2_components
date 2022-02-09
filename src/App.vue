<template>
  <div id="app">
    <div class="main-item-wrapper">
      <rating
        :rateState="4"
        :disabled="false"
        @value="(val) => rate = val"
        :starFill="'orange'"
        :starStroke="'orange'"
        :starsCount="5"
      />
      <div class="wrap testfield">
        <h3> Rating is: {{this.rate}} </h3>
      </div>
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
      />
      <div class="wrap testfield">
        <h3>Selected ItemId: {{listItem}}</h3>
      </div>
    </div>
    <div class="main-item-wrapper tags">
      <div class="wrap">
        <select-tag
          :data="tags"
          @change="(arr) => this.tags = arr"
          @selected="(arr) => this.selectedTags = arr"
          :withCheckbox="true"
          :flexGrow="false"
          :autoHeight="true"
        />
      </div>
      <div class="item-flex">
          <span v-for="(item,ind) in selectedTags" :key="ind">
              {{item.title}}
          </span>
      </div>
    </div>
    <div class="main-item-wrapper">
      <range-slider 
        :min="1"
        :max="20"
        :steps="1"
        v-model="sliderValue"
      />
    </div>
      <div id="chart"> </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating/Rating.vue'
import CustomDropDown from './components/CustomDropdown/CustomDropDown.vue'
import SelectTag from '@/components/SelectTag/SelectTag.vue'
// import RangeSlider from 'vue-range-slider'
import RangeSlider from '@/components/RangeSlider/RangeSlider.vue'
import ApexCharts from 'apexcharts'
export default {
  name: 'App',
  components: {
    Rating,
    CustomDropDown,
    SelectTag,
    RangeSlider
    // RangeSlider
  },
  data(){
    return{
      rate: null,
      listItem: null,
      tags:[],
      data: [],
      selectedTags:[],
      sliderValue: 7,
      chartData:{
        chart: {
          type: 'radar',
          dropShadow:{
            enabled:true,
            blur: 1,
            left: 1,
            top: 1,
          },
          zoom:{
            enabled:true
          }
        },
        series: [
          {
            name: 'series I',
            data: [4,3,50,49,60,70,91,125,3]
          },
          {
            name: 'series II',
            data: [5,40,45,50,49,60,70,91,125]
          },
          {
            name: 'series III',
            data: [-133,40,45,50,49,60,70,91,125]
          },
          {
            name: 'series IV',
            data: [4,3,50,49,60,70,91,125,3]
          },

        ],
        xaxis: {
          categories: [1990,1992,1993,1994,1995,1996,1997, 1998,1999]
        }
      }
    }
  },
  created(){
    this.testarr()
  },
  mounted(){
    this.renderChartData(this.chartData)
  },
  methods:{
    testarr(){
      let arr = []
      for (let j=0; j <= 15; j++){
        let obj={
          title: `item-${j}`,
          id: j,
          selected: false,
        }
        arr.push(obj)
      }
      this.tags = [...arr]
    },
    renderChartData(arr){
      var chart = new ApexCharts(document.querySelector("#chart"), arr);
      chart.render();
    },
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
  display: grid;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 0.9375rem;
  grid-row-gap: 0.9375rem;

}
.slider{
  width: 500px !important;

}
.render{
  width: 6.25rem;
  height: 3.125rem;
  position: absolute;
}
.main-big-comp-wrapper{
  width: 100%;
  border-bottom: 0.0625rem solid rgba(#3d3d3d, .1);
}

.main-item-wrapper,.main-big-comp-wrapper{
  border-left: 0.0625rem solid rgba(#3d3d3d, .1);
  padding-bottom: 1rem;
  min-height: 12.5rem;
  display: grid;
  place-items: center;

  &.tags{
    .wrap{
      width: 30rem;
    }
  }

  &:first-child{
    text-align: center;
    grid-area: 1 / 1 / 2 / 2;
  }

  &:nth-child(2){
    grid-area: 1 / 2 / 2 / 3;
  }
  &:nth-child(3){
    grid-area: 2 / 1 / 3 / 3;
  }

  .testfield{
    width: 18.75rem;
    height: 6.25rem;
    overflow: auto;
    margin: 3.125rem auto;
    position: relative;

  }
  
}

.item-flex{
  width: 25rem;
  position: absolute;
  right: 16.25rem;
  display: flex;
  flex-wrap: wrap;
  span{
    margin-left: 1.25rem;
    border-right: 0.0625rem solid rgba(#4f4f4f, .3) ;
    padding-right: 0.625rem;
  }
}
</style>
