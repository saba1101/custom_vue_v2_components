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
      <div id="chart" v-show="false"> </div>

      <div class="main-item-wrapper drag">
        <draggable 
          v-model="tags"
          @change="dragChange"
        >
            <transition-group>
                <div class="draggable-item" v-for="(el,ind) in tags" :key="ind">
                    {{el.title}}
                </div>
            </transition-group>
        </draggable>
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
export default {
  name: 'App',
  components: {
    Rating,
    CustomDropDown,
    SelectTag,
    RangeSlider,
    draggable
    // RangeSlider
  },
  data(){
    return{
      rate: null,
      listItem: null,
      tags:[],
      selectedTags:[],
      data: [],
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
      },
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
    ]
    }
  },
  created(){
    // this.testarr()
    this.getTestApi()
  },
  mounted(){
    this.renderChartData(this.chartData)
  },
  methods:{
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

  &.drag{
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
