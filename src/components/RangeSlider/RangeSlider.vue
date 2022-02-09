<template>
    <div class="range">
        <range-slider
          class="slider"
          :min="min"
          :max="max"
          :step="steps"
          v-model="val"
          @input="$emit('input',val)"
        >

          <template slot="knob">
            <div class="label">
              <span>
                {{ this.val}}
              </span>
            </div>
          </template>

        </range-slider>
    </div>
</template>

<script>
import RangeSlider from 'vue-range-slider' //npm install --save vue-range-slider
import "@/components/RangeSlider/rangeSlider.css"

export default {
    components:{
        RangeSlider,
    },
    props:{
        min:{
            type:Number,
            default: 1,
        },
        max:{
            type: Number,
            default: 10,
        },
        steps:{
            type:Number,
            default: 1,
        },
        value: Number,
    },
    data(){
        return{
            val: ''
        }
    },
    created(){
        this.val = this.value
    },
}
</script>

<style lang="scss" scoped>

</style>