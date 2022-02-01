<template>
    <div class="custom-grid-wrapper">
        <div class="custom-grid">
            <div class="head">
                <div class="row">
                    <div class="col" v-if="withIndex">#</div>
                    <div class="col" v-for="(item,ind) in columns" :key="ind">
                        <span> {{item.columnName ? item.columnName : ''}} </span>
                    </div>
                </div>
            </div>
            <div class="grid-body">
                <div class="row" v-for="(item,ind) in columns" :key="ind">
                    <div class="col">
                        {{ind + 1}}
                    </div>
                    <div class="col" v-for="s in item.columnData" :key="s.index">
                        {{s}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type: Array
        },
        columns: Array,
        withIndex:{
            type: Boolean,
            default: true,
        }
    },
    data(){
        return{
            
        }
    },
    created(){
        this.modifyData()
    },
    computed:{

    },
    methods:{
        modifyData(){
            this.columns.forEach(col => {
                let d = this.data.map(el => el[col.key])
                this.$set(col,'columnData',d)
                console.log(JSON.parse(JSON.stringify(col)));
            })
        }
    },

    
}
</script>

<style lang="scss" scoped>
.custom-grid-wrapper{
    width: 100%;
    overflow: auto;

    .row{
        height: 5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
    }

    .col{
        display: block;
        max-width: 20rem;

    }

    .head{
        width: 100%;
    
    }


}
</style>