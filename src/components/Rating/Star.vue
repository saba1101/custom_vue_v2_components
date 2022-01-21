<template>
    <div  
        @click="$emit('onSelect')"
        @mouseenter="$emit('entered')"
        @mouseleave="$emit('left')"
        :class="['single-star',{'selected':selected}]"
    >

        <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :style="inSelection ? 'opacity: .5' : ''" :fill="selected ? fill : 'transparent'" viewBox="0 0 24 24"><path :stroke="!selected ? stroke : ''" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
        </svg>

    </div>    
</template>

<script>
export default {
    props:{
        width: Number,
        height: Number,
        fill: String,
        stroke: String,
        selected: Boolean,
        inSelection: Boolean,
    },
}
</script>

<style lang="scss" scoped>
.single-star{
    display: inline-flex;
    margin-left: 0.625rem;
    transition: ease .3s;

    &:hover{
        transform: translateY(-0.1875rem) rotate(13deg);
    }


    svg{
        transition: ease .2s opacity;
    }
    cursor: pointer;

    &:first-child{
        margin-left: 0;
    }
}
</style>