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
  </div>
</template>

<script>
import Rating from '@/components/Rating/Rating.vue'
import CustomDropDown from './components/CustomDropdown/CustomDropDown.vue'
export default {
  name: 'App',
  components: {
    Rating,
    CustomDropDown,
  },
  data(){
    return{
      rate: null,
      listItem: null,
      gridData: [
        {
          "_id": "61f7e82d6a505ed7de4a120c",
          "index": 0,
          "guid": "c9b5ff59-9a67-4c5c-82ea-f354845baec5",
          "isActive": false,
          "balance": "$3,454.39",
          "picture": "http://placehold.it/32x32",
          "age": 21,
          "eyeColor": "green",
          "name": "Jeannette Mcleod",
          "gender": "female",
          "company": "PROSELY",
          "email": "jeannettemcleod@prosely.com",
          "phone": "+1 (858) 431-2413",
          "address": "997 Fillmore Place, Garberville, Palau, 2813",
          "about": "Do laborum deserunt exercitation ipsum adipisicing sint velit quis. Sunt eiusmod elit aute dolor et in eu fugiat in Lorem consequat. Lorem labore aute quis aliquip cupidatat elit irure velit tempor aliquip exercitation. Non eu et amet sunt mollit aliqua do nisi fugiat consequat laborum sit.\r\n",
          "registered": "2018-01-09T01:10:31 -04:00",
          "latitude": 82.110753,
          "longitude": 120.073072,
          "tags": [
              "officia",
              "dolore",
              "duis",
              "eiusmod",
              "Lorem",
              "quis",
              "dolore"
          ],
          "friends": [
              {
                  "id": 0,
                  "name": "Dianna Freeman"
              },
              {
                  "id": 1,
                  "name": "Shelia Valentine"
              },
              {
                  "id": 2,
                  "name": "Helena Taylor"
              }
          ],
          "greeting": "Hello, Jeannette Mcleod! You have 8 unread messages.",
          "favoriteFruit": "banana"
      },
      {
          "_id": "61f7e82d6da94f4070a1a87c",
          "index": 1,
          "guid": "93feec07-c106-4d50-9dc3-27095c8c7060",
          "isActive": true,
          "balance": "$1,004.94",
          "picture": "http://placehold.it/32x32",
          "age": 35,
          "eyeColor": "blue",
          "name": "Velazquez Nichols",
          "gender": "male",
          "company": "QOT",
          "email": "velazqueznichols@qot.com",
          "phone": "+1 (999) 529-3953",
          "address": "981 Tillary Street, Conway, Indiana, 1824",
          "about": "Ut fugiat nostrud pariatur exercitation incididunt culpa reprehenderit culpa est reprehenderit dolore magna. Sit aliquip magna proident cillum non. Lorem cupidatat fugiat do laboris esse. Do exercitation veniam tempor laborum non magna nisi. Aliquip enim ullamco sunt velit enim id nisi incididunt proident. Ut cillum id id velit dolor adipisicing eiusmod. Excepteur cupidatat reprehenderit dolore id.\r\n",
          "registered": "2017-03-09T06:05:34 -04:00",
          "latitude": -43.707448,
          "longitude": -84.703329,
          "tags": [
              "culpa",
              "deserunt",
              "Lorem",
              "anim",
              "irure",
              "quis",
              "voluptate"
          ],
          "friends": [
              {
                  "id": 0,
                  "name": "Wilder Gibbs"
              },
              {
                  "id": 1,
                  "name": "Villarreal Adkins"
              },
              {
                  "id": 2,
                  "name": "Leblanc Eaton"
              }
          ],
          "greeting": "Hello, Velazquez Nichols! You have 3 unread messages.",
          "favoriteFruit": "strawberry"
      },
      {
          "_id": "61f7e82d3c957314a1594d4d",
          "index": 2,
          "guid": "bc4c417b-12a9-40db-b7fa-f1de14de5315",
          "isActive": true,
          "balance": "$2,795.36",
          "picture": "http://placehold.it/32x32",
          "age": 31,
          "eyeColor": "green",
          "name": "Clara Wilkerson",
          "gender": "female",
          "company": "HELIXO",
          "email": "clarawilkerson@helixo.com",
          "phone": "+1 (914) 532-3709",
          "address": "574 Mill Lane, Kerby, Alaska, 4290",
          "about": "Irure pariatur aute non proident occaecat magna mollit cupidatat occaecat. Culpa ullamco eu fugiat incididunt exercitation ut consequat ut culpa laborum non deserunt esse. Ex ad pariatur et aute nostrud. Sit consectetur ex magna magna excepteur occaecat. Mollit dolore culpa quis officia deserunt excepteur dolore. Nostrud reprehenderit do minim culpa reprehenderit adipisicing.\r\n",
          "registered": "2015-06-14T06:22:06 -04:00",
          "latitude": 1.671824,
          "longitude": -93.496461,
          "tags": [
              "ullamco",
              "dolor",
              "consectetur",
              "labore",
              "et",
              "consequat",
              "ex"
          ],
          "friends": [
              {
                  "id": 0,
                  "name": "Lillie Webster"
              },
              {
                  "id": 1,
                  "name": "Hansen Sweeney"
              },
              {
                  "id": 2,
                  "name": "Noelle Travis"
              }
          ],
          "greeting": "Hello, Clara Wilkerson! You have 2 unread messages.",
          "favoriteFruit": "strawberry"
      },
      {
          "_id": "61f7e82de16592a7753c3061",
          "index": 3,
          "guid": "01643a71-a692-40ca-b3ac-dcb0925061f7",
          "isActive": true,
          "balance": "$2,839.45",
          "picture": "http://placehold.it/32x32",
          "age": 39,
          "eyeColor": "green",
          "name": "Stacey Sexton",
          "gender": "female",
          "company": "AVIT",
          "email": "staceysexton@avit.com",
          "phone": "+1 (889) 558-2582",
          "address": "529 Aviation Road, Roberts, Northern Mariana Islands, 6525",
          "about": "Ullamco voluptate sunt ea fugiat deserunt consectetur Lorem commodo irure labore ullamco proident. Eiusmod sunt elit aute veniam. Esse magna ullamco reprehenderit adipisicing dolore. Veniam eu nisi in veniam exercitation cillum reprehenderit magna cillum id elit officia eu. Exercitation culpa occaecat id minim ex dolore minim nostrud ex esse. Sit anim pariatur et aliquip tempor Lorem proident excepteur est aliquip consequat. Ipsum nostrud sunt velit cupidatat adipisicing ut magna eiusmod ea officia tempor do dolore non.\r\n",
          "registered": "2016-06-27T10:26:47 -04:00",
          "latitude": -13.652668,
          "longitude": 13.160748,
          "tags": [
              "id",
              "labore",
              "non",
              "mollit",
              "labore",
              "magna",
              "ut"
          ],
          "friends": [
              {
                  "id": 0,
                  "name": "Mathews Lee"
              },
              {
                  "id": 1,
                  "name": "Jordan Carson"
              },
              {
                  "id": 2,
                  "name": "Ware Dillard"
              }
          ],
          "greeting": "Hello, Stacey Sexton! You have 6 unread messages.",
          "favoriteFruit": "apple"
      },
      {
          "_id": "61f7e82dc6f82ccd90346e44",
          "index": 4,
          "guid": "89f712cd-5018-45f5-b512-3181a6cedd52",
          "isActive": false,
          "balance": "$3,159.54",
          "picture": "http://placehold.it/32x32",
          "age": 38,
          "eyeColor": "brown",
          "name": "Teri Shaffer",
          "gender": "female",
          "company": "COSMETEX",
          "email": "terishaffer@cosmetex.com",
          "phone": "+1 (976) 404-3026",
          "address": "420 Tompkins Avenue, Dahlen, Nevada, 7961",
          "about": "Qui cupidatat aliquip excepteur voluptate laborum. Irure commodo ullamco enim ullamco deserunt sint magna cillum. Exercitation labore nisi veniam proident velit fugiat est eu commodo. Non sint laboris irure excepteur aute ullamco tempor laboris ad qui aliquip.\r\n",
          "registered": "2017-04-25T05:48:30 -04:00",
          "latitude": -32.559589,
          "longitude": -5.751547,
          "tags": [
              "veniam",
              "eiusmod",
              "nostrud",
              "enim",
              "commodo",
              "veniam",
              "officia"
          ],
          "friends": [
              {
                  "id": 0,
                  "name": "Duncan Fry"
              },
              {
                  "id": 1,
                  "name": "Kline Price"
              },
              {
                  "id": 2,
                  "name": "James Bray"
              }
          ],
          "greeting": "Hello, Teri Shaffer! You have 8 unread messages.",
          "favoriteFruit": "banana"
        }
      ],
      columns:[
        {
          columnName: 'Full-Name',
          key: 'name',
        },
        {
          columnName: 'EmailAddress',
          key: 'email',
        },
        {
          columnName: 'PhoneNumber',
          key:'phone'
        },
        {
          columnName: 'Gender',
          key: 'gender',
        },
        {
          columnName: 'Address',
          key: 'address',
        },
        {
          columnName: 'Company',
          key: 'company',
        },
        {
          columnName: 'About-Me',
          key: 'about',
        }
      ]
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
  display: grid;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 0.9375rem;
  grid-row-gap: 0.9375rem;

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

  }
  
}
</style>
