<template>
    <div class="custom-grid-wrapper">
        <table>
            <thead>
                <tr>
                    <th v-if="withIndex">#</th>
                    <th v-for="(item,ind) in columns" :key="ind">
                        <span> {{item.columnName ? item.columnName : ''}} </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,ind) in columns" :key="ind">
                    <td>
                        {{ind + 1}}
                    </td>
                    <!-- <td v-for="(el,index) in columns" :key="index"> -->
                        {{setGridObjects(item.key,ind)}}
                    <!-- </td> -->
                </tr>
            </tbody>
        </table>
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

    },
    computed:{

    },
    methods:{
        setGridObjects(key,ind){
            if(key === undefined || !key || !ind || ind > this.data.length) return 
            else return  this.data[ind][key]
        },
    },

    
}
</script>

<style lang="scss" scoped>
.custom-grid-wrapper{
    width: 100%;
    overflow: auto;

    table{
        width: 100%;
        text-align: left;
        padding: 0 1.25rem;
        border-collapse: collapse;
        td,th{
            padding: 0.625rem 0.625rem;
            border: 0.0625rem solid rgba(#454545, .4);
            white-space: nowrap;
            padding-left: 1.875rem;
            padding-right: 1.875rem;
            max-width: 40rem;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        thead{

            tr{
                position: sticky;
                top: 0;
                span{
                    font-size: 0.9375rem;
                }
            }
        }

        tbody{
            tr{
                td{

                }
            }
        }
    }
}
</style>