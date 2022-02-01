<template>
    <div :class="['custom-rating',{'disabled':disabled}]">
        <div class="wrapper">
            <star
                :width="starWidth"
                :height="starHeight"
                :fill="starFill"
                :stroke="starStroke"
                v-for="(star,ind) in rate"
                :key="ind"
                @onSelect="handleSelect(star)"
                :selected="star.selected"
                @entered="handleEnter(star)"
                @left="handleLeave(star)"
                :inSelection="star.inSelection"
            />
        </div>
    </div>    
</template>

<script>
import Star from "@/components/Rating/Star.vue"
export default {
    components: {
        Star
    },
    props:{
        disabled: Boolean,
        rateState: Number,
        starWidth: {
            type: Number,
            default: 25,
        },
        starHeight: {
            type: Number,
            default: 25,
        }, 
        starFill: String,
        starStroke: String,
        starsCount: {
            type:Number,
            default: 5,
        },
    },
    data(){
        return{
            rate:[],
            currentRate: null,
        }
    },
    created(){
        this.rate = this.rateData
        this.rate.forEach(el => {
            if(el.value <= this.rateState) el.selected = true
            else{
                el.selected = false
            }
        })
    },
    watch:{
        rateState:{
            handler(value){
                if(value === null || !value) return
                this.rate.forEach(el => {
                    if(el.value <= value) el.selected = true
                    else{
                        el.selected = false
                    }
                })
            }
        },
        immediate: true
    },
    methods:{
        handleSelect(star){
            if(this.disabled) return

            let currentRate = star.value
            this.rate.forEach(el => {
                if(el.value <= currentRate) el.selected = true
                else{
                    el.selected = false
                }
            })
            this.currentRate = currentRate
            this.$emit('value',currentRate)
        },
        handleEnter(star){
            let val = star.value
            this.rate.forEach(el => {
                if(el.value <= val) el.inSelection = true
            })
        },
        handleLeave(star){
            let val = star.value
            this.rate.forEach(el => {
                if(el.value <= val) el.inSelection = false
            })
        }
    },
    computed:{
        rateData(){
            let rate = []
            for(let i=1; i <= this.starsCount; i++){
                let obj = {
                    value: i,
                    selected: false,
                    inSelection: false,
                }
                rate.push(obj)
            }
            return rate
        }

    }
}
</script>

<style lang="scss" scoped>
.custom-rating{
    width: 100%;
    &.disabled{
        pointer-events: none;
    }
}
</style>