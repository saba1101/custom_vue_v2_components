<template>
  <div id="app">
    <div class="main-item-wrapper">
      <div class="particles">
          <vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="130"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="false"
            :lineOpacity="0"
            :linesDistance="150"
            :moveSpeed="2"
            :hoverEffect="false"
            hoverMode="grab"
            :clickEffect="false"
            clickMode="push"
          >
        </vue-particles>
      </div>
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
        :data="testList"
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
          :selectedItems="selectedTags"
          :withCheckbox="true"
          :flexGrow="false"
          :autoHeight="true"
          @select="selectTag"
          @createNewItem="addNewItem"
          @editMode="editMode"
          @removeItem="removeItem"
          @deleteItem="deleteItem"
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
        :min="6"
        :max="8"
        :steps="1"
        v-model="sliderValue"
      />
    </div>
      <!-- <div id="chart" v-show="false"> </div> -->
      <radar-chart
        :width='400'
        :height="400"
        :chartdata="chartData"
        :chartoptions="chartOptions"

       />

      <div class="main-item-wrapper drag">
        <draggable 
          v-model="tags"
          @change="dragChange"
          ghost-class="ghost"
          :sort="true"
        >
            <transition-group tag="ul">
                <li class="draggable-item" v-for="(el,ind) in tags" :key="ind">
                    {{el.title}}
                </li>
            </transition-group>
        </draggable>
            <button slot="header" @click="setIndex">ind</button>

      </div>
      <div class="main-item-wrapper">
              <star-rating
                @update:rating="(val) => ratingValue = val"
                :starSize="30"
                :round-start-rating="false"
                :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                :border-width="0"
                :active-color="['orange','orange']"
                :active-border-color="['#F6546A','#a8c3c0']"
                :clearable="true"
                active-on-click
                animate
                :padding="5"
                :increment='0.5'
                :max-rating="10"
                :readOnly="false"
              >
              </star-rating>
      </div>
      <div class="main-item-wrapper">

            <slide-bar
              v-model="slidebarValue"
              :min="5"
              :max="7"
              :data="slider.data"
              :range="slider.range"
              :processStyle="slider.processStyle"
              :lineHeight="slider.lineHeight"
              @dragStart="slidebarDrag"
              :showTooltip="true"
              :isDisabled="false"
              >
            </slide-bar>
      </div>
      <div class="main-item-wrapper">
          <ul>
              <li :class="['score']" v-for="i in scores" :key="i">
                  {{i}}
              </li>
            </ul>
      </div>
  </div>

</template>

<script>
import Rating from '@/components/Rating/Rating.vue'
import CustomDropDown from './components/CustomDropdown/CustomDropDown.vue'
import SelectTag from '@/components/SelectTag/SelectTag.vue'
import draggable from 'vuedraggable'
// import RangeSlider from 'vue-range-slider'
import RangeSlider from '@/components/RangeSlider/RangeSlider.vue'
import ApexCharts from 'apexcharts'
import axios from 'axios'
import StarRating from '@/components/StarRating/star-rating.vue'
import SlideBar from '@/components/SlideBar/SlideBar.vue'
import RadarChart from '@/components/RadarChart/RadarChart.vue'
export default {
  name: 'App',
  components: {
    Rating,
    CustomDropDown,
    SelectTag,
    RangeSlider,
    draggable,
    StarRating,
    SlideBar,
    RadarChart,
    // RangeSlider
  },
  data(){
    return{
      scores:[4,5,6,7],
      rate: null,
      listItem: null,
      ratingValue: 5.5,
      slidebarValue: 6.5,
      tags:[],
      selectedTags:[],
      data: [],
      sliderValue: 7,
      // chartData:{
      //   chart: {
      //     type: 'radar',
      //     dropShadow:{
      //       enabled:true,
      //       blur: 1,
      //       left: 1,
      //       top: 1,
      //     },
      //     zoom:{
      //       enabled:true
      //     }
      //   },
      //   series: [
      //     {
      //       name: 'series I',
      //       data: [4,3,50,49,60,70,91,125,3]
      //     },
      //     {
      //       name: 'series II',
      //       data: [5,40,45,50,49,60,70,91,125]
      //     },
      //     {
      //       name: 'series III',
      //       data: [-133,40,45,50,49,60,70,91,125]
      //     },
      //     {
      //       name: 'series IV',
      //       data: [4,3,50,49,60,70,91,125,3]
      //     },

      //   ],
      //   xaxis: {
      //     categories: [1990,1992,1993,1994,1995,1996,1997, 1998,1999]
      //   }
      // },
      arr:[
      {
        "id": 103,
        "title": "urturt",
        "titleTranslated": "urturt",
        "selected": false
      },
      {
        "id": 102,
        "title": "new 2",
        "titleTranslated": "new 2",
        "selected": false
      },
      {
        "id": 101,
        "title": "Team management skills;",
        "titleTranslated": "Team management skills;",
        "selected": false
      },
      {
        "id": 100,
        "title": "Sociability;",
        "titleTranslated": "Sociability;",
        "selected": false
      },
      {
        "id": 99,
        "title": "knowledge of SDLC",
        "titleTranslated": "knowledge of SDLC",
        "selected": false
      },
      {
        "id": 98,
        "title": "Good knowledge of Agile SWD methodology (Scrum, practical skills)",
        "titleTranslated": "Good knowledge of Agile SWD methodology (Scrum, practical skills)",
        "selected": false
      },
      {
        "id": 97,
        "title": "High sense of responsibility",
        "titleTranslated": "High sense of responsibility",
        "selected": false
      },
      {
        "id": 96,
        "title": " Basic knowledge of UX / UI design principles",
        "titleTranslated": " Basic knowledge of UX / UI design principles",
        "selected": false
      },
      {
        "id": 95,
        "title": "Fundamental knowledge of the complete cycle of software creation",
        "titleTranslated": "Fundamental knowledge of the complete cycle of software creation",
        "selected": false
      },
      {
        "id": 94,
        "title": "asasdad EN",
        "titleTranslated": "asasdad EN",
        "selected": false
      },
      {
        "id": 93,
        "title": "2641 en",
        "titleTranslated": "2641 en",
        "selected": false
      },
      {
        "id": 92,
        "title": "Details",
        "titleTranslated": "Details",
        "selected": false
      },
      {
        "id": 90,
        "title": "new",
        "titleTranslated": "new",
        "selected": false
      },
      {
        "id": 89,
        "title": "Multitasking",
        "titleTranslated": "Multitasking",
        "selected": false
      }
      ],
      testList: [],
      slider: {
        value: 5,
        data: [
          5,
          5.5,
          6,
          6.5,
          7,
        ],
        range: [
          {
            label: '5',
            type: 'int',
          },
          {
            label: '5.5',
            isHide: true,
            type: 'float',
          },
          {
            label: '6',
            type: 'int',
          },
          {
            label: '6.5',
            isHide: true,
            type: 'float',

          },
          {
            label: '7',
            type: 'int',
          },
        ],
        lineHeight: 6,
        processStyle: {

        }
      },
      chartData: {
        labels: [
          'Eating',
          'Drinking',
          'Sleeping',
          'Designing',
          'Coding',
          'Cycling',
          'Running',
          'Running',
          'Running',
          'Running',
          'Running',

        ],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'lime',
            borderColor: 'lime',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [0, 1, 2, 3, 4, 5, 6,7,8,9,10]
          },
          {
            label: 'My Second dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  created(){
    // this.testarr()
    this.getTestApi()
  },
  mounted(){
    // this.renderChartData(this.chartData)
  },
  methods:{
    slidebarDrag(){
      // this.slider.range.forEach(el => {
      //   if(el.type === 'int'){
      //     if(parseInt(el.label) <= this.slidebarValue){
      //       el['active'] = true
      //     }else{
      //       el['active'] = false
      //     }
      //   }
      //   if(el.type === 'float'){
      //     if(parseFloat(el.label) <= this.slidebarValue){
      //       el['active'] = true
      //     }else{
      //       el['active'] = false
      //     }
      //   }
      // })
    },
    setIndex(){
      this.tags.forEach((el,ind) => {
        this.$set(el,'order',ind)
      })
    },
    // testarr(){
    //   let arr = []
    //   for (let j=0; j <= 15; j++){
    //     let obj={
    //       title: `item-${j}`,
    //       id: j,
    //       selected: [2,6,8,1].includes(j) ? true : false,
    //     }
    //     arr.push(obj)
    //   }
    //   this.tags = [...arr]
    // },
    renderChartData(arr){
      var chart = new ApexCharts(document.querySelector("#chart"), arr);
      chart.render();
    },
    async getTestApi(){
      await axios.get('https://run.mocky.io/v3/8e8a2a83-6476-4bd8-9001-bd27807a9284')
      .then(resp => {
        let data = resp.data.OpenPositionItems
        this.tags = data.map(el => ({
          title: el.Description,
          id: el.ID,
          selected: false,
          edit:false,
          value: el.Description
        }))

        this.testList = resp.data.OpenPositionItems.map(el => ({
          title: el.Description,
          value: el.ID
        }))
      })
    },

    dragChange($event){
      console.log($event.moved); //obtain new and old indexes
      // let movedItem = $event.moved.element.id
    },




    ///////////////////select tag component methods ////////////////

    selectTag(item){
      item.selected = !item.selected
      if(!item.newItem){
        let exists = this.selectedTags.some(el => el.id === item.id || el.value === item.value)
        if(!exists && item.selected){
          this.selectedTags.push(item)
        }else{
          this.selectedTags = this.selectedTags.filter(el => el.id !== item.id)
        }
      }else{
        let exists = this.selectedTags.some(el => el.value === item.value)
        if(!exists && item.selected){
          this.selectedTags.push(item)
        }else{
          this.selectedTags = this.selectedTags.filter(el => el.value !== item.value)
        }
      }

    },
    addNewItem(title){
      let newObj = {
        title: title,
        newItem: true,
        selected: true, //new items will be selected
        edit: false,
        value: title,
      }

      if(this.selectedTags.some(el => el.value === title) || this.tags.some(el => el.value === title)) return
      this.selectedTags.push(newObj)
      this.tags.unshift(newObj)
    },
    // editItem(val,item){
    //   console.log(val,"--",item);
    // },
    editMode(item){
      this.tags.forEach(el => {
        if(!item.newItem){
          if(el.id === item.id) el.edit = !el.edit
          else el.edit = false
        }else{
          if(el.value === item.value) el.edit = !el.edit
          else el.edit = false
        }
      })
    },
    removeItem(item){
      item.selected = false
      if(!item.newItem){
        this.selectedTags = this.selectedTags.filter(el => el.id !== item.id)
      }else{
        this.selectedTags = this.selectedTags.filter(el => el.value !== item.value)
      }
    },
    deleteItem(item){
      if(item.newItem){
        this.tags = this.tags.filter(el => el.value !== item.value)
        if(this.selectedTags.some(el => el.value === item.value)){
          this.selectedTags = this.selectedTags.filter(el => el.value !== item.value)
        }
      }
      ////// api call 
    }

  /////////////////////////////////////////////////////////////////
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

.particles{
  position: absolute;
  top: 0;
  left: 0;
  border: 0.0625rem solid red;
  z-index: 9999;
  width: 100vw;
  height: 200vh;
}

.slider{
  width: 500px !important;

}
ul{
  list-style: none;
}
.score{
  color: #3d3d3d;

  &.red{
    color: indianred;
  }
  &.lime{
    color: lime;
  }
  &.orange{
    color: orange;
  }
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

  &.drag{
    ul{
      list-style: none;
    }
    .draggable-item{
      padding: 0.3125rem 0.625rem;
      border: 0.0625rem solid rgba(#4f4f4f, .3);
    }
  }

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
