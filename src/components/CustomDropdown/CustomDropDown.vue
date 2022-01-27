<template>
    <div ref="dropdown" :class="['dropdown-wrapper',{'dark': darkTheme},{'disabled':selecteditem }]">
        <div class="selection-placeholder">
            <input type="text" :placeholder="placeholder" v-model="selectedItemTitle" @input="filteredData($event)" @focus="dropDownVisible = true">
            <div :class="['arrow',{'up':dropDownVisible}]" @click="dropDownVisible = !dropDownVisible">
                <svg class="svg-icon" viewBox="0 0 20 20">
                    <path :fill="darkTheme ? '#fff' : '#3d3d3d'" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
                </svg>
            </div>
            <div class="clear" v-if="selectedItemTitle && !selecteditem" @click="clear">
                <svg class="svg-icon" viewBox="0 0 20 20">
                    <path fill="#e56464" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                </svg>
            </div>
        </div>

        <div class="dropdown-list-wrapper" v-if="dropDownVisible">
            <ul class="list" v-if="filteredList.length > 0">
                <li :ref="'listItem'+ind" :class="['list-item',{'selected': item.selected}]" v-for="(item, ind) in filteredList" :key="ind" @click="selectItem(item)">
                    <input class="item-checkbox" v-if="withCheckBox" type="checkbox" name="check" :checked="item.selected">
                    <span v-if="withIndex" class="ind"> <i># {{ ind }}</i></span>
                    <span>
                        {{ item.title }}
                    </span>
                </li>
            </ul>
            <div class="empty" v-else>
                <span >
                    There Are No Items
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data: Array,
        withIndex: {
            type: Boolean,
            default: false,
        },
        placeholder: String,
        darkTheme: {
            type:Boolean,
            default: false,
        },
        withCheckBox: {
            type: Boolean,
            default: false,
        },
        selecteditem: {
            type: Number,
            default: null,
        }
    },
    created(){
        this.modifyData(this.data)
        document.addEventListener("click", this.clickHandler);
        this.setSelectedItem()
    },

    updated(){
        this.setSelectedItem()
    },
    data(){
        return{
            dropDownVisible: false,
            selectedItemTitle: '',
            selectedItemValue: null,
            filteredList: []
        }
    },
    watch:{
        selectedItemTitle(val){
            if(!val || val === '' || val.length < 1){
                this.selectedItemValue = null
                
                this.data.forEach(el => {
                    el.selected = false
                })
                this.filteredList = this.data

                this.$emit('select',this.selectedItemValue)
            }
        }
    },
    methods:{
        selectItem(item){
            this.selectedItemValue = item.value
            this.selectedItemTitle = item.title

            this.data.forEach(el => {
                if(el.value === item.value) el.selected = true
                else el.selected = false
            })

            this.$emit('select',item.value)
            this.dropDownVisible = false
        },
        modifyData(data){
           data.forEach(el => {
                this.$set(el,'selected',false)
            })
            this.filteredList = data
        },
        setSelectedItem(){
            if(this.selecteditem){
                this.data.forEach(el => {
                    if(el.value === this.selecteditem) el.selected = true
                })
                this.selectedItemTitle = this.data.find(el => el.value === this.selecteditem).title
                this.selectedItemValue = this.selecteditem
            }
        },
        filteredData($event){
            let searchValue = $event.target.value.toLowerCase()
            this.filteredList = this.data.filter(el => el.title.toLowerCase().includes(searchValue))
            this.filteredList.forEach(el => {
                if(el.title.toLowerCase() === searchValue){
                    el.selected = true
                    this.selectedItemValue = el.value
                    this.$emit('select',el.value)
                }
                else el.selected = false
            })
        },
        clickHandler(event) {
            if(event.path.includes(this.$refs.dropdown)) return
            this.dropDownVisible = false
        },
        clear(){
            this.selectedItemTitle = ''
            this.selectedItemValue = null
            this.data.forEach(el => el.selected = false)
            this.$emit('select',this.selectedItemValue)
            this.dropDownVisible = false
        }

    },
    destroyed() {
        document.removeEventListener("click", this.clickHandler);
    },
}
</script>

<style lang="scss" scoped>
.dropdown-wrapper{
    width: 18.75rem;
    position: relative;

    &.disabled{
        pointer-events: none;
    }

    &.dark{
        .selection-placeholder{
            border: 0.0625rem solid rgba(#fff, .4);
            background: rgba(#454545, 1);
            input{
                color: #fff;

                &::placeholder{
                    color: rgba(#fff, 1);
                    font-size: 0.9375rem;
                }
            }
        }
        .dropdown-list-wrapper{
            background: rgba(#454545, 1);

            ul{
                li{
                    color: #fff;

                    &:hover::before{
                        background: rgba(#fff, .2);
                    }

                    &.selected{
                        opacity: .6;
                        &::before{
                            background: rgba(#fff,.6);
                        }
                    }
                }
            }
            .empty{
                span{
                    color: #fff;
                }
            }
        }
    }

    .selection-placeholder{
        width: 100%;
        height: 2.5rem;
        position: relative;
        border: 0.0625rem solid rgba(#ffffff, .2);
        border-radius: 0.3125rem;
        transition: ease .3s;
        box-shadow: 0.0625rem 0.0625rem 1.25rem rgba(#3d3d3d,.2);

        input{
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            color: rgba(#3d3d3d, .7);
            font-size: 0.9375rem;
            box-sizing: border-box;
            padding: 0 0.625rem;
            padding-right: 3.15rem;
            background: transparent;

            &::placeholder{
                color: rgba(#3d3d3d, .7);
                font-size: 0.9375rem;
            }
        }

        .arrow,.clear{

            position: absolute;
            top: 50%;
            right: 2%;
            transform: translate(0, -50%) rotate(90deg);
            cursor: pointer;
            user-select: none;
            transition: ease .3s;

            &.clear{
                right: 12%;
                animation: clearBtn .3s forwards;
                svg{
                    width: 1rem;
                }
            }


            @keyframes clearBtn {
                from{
                    opacity: 0;
                    top: 0;
                }
                to{
                    opacity: 1;
                    top: 50%;
                }
            }

            &.up{
                transform: translate(0, -50%) rotate(-90deg) !important;
            }

            svg{
                width: 1.25rem;
                opacity: .8;
            }

        }
    }

    .dropdown-list-wrapper{
        width:100%;
        min-height: 0rem;
        max-height: 12.5rem;
        position: absolute;
        top: calc(100% - 0.125rem);
        border-radius: 0.3125rem;
        background: #fff;
        overflow-y: auto;
        animation: dropdown .6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        box-shadow: 0rem 0rem 10rem rgba(#3d3d3d, .1);

        @keyframes dropdown {
            from{
                transform: translateY(20%) rotate3d(1, 1, 1, -20deg);
                opacity: 0;
                border: 0.0625rem solid rgba(#ffffff, .1);
                
            }
            to{
                transform: translateY(0) rotate3d(1, 1, 1 0deg);
                opacity: 1;
                border: 0.0625rem solid rgba(#ffffff, .2);
            }
        }

        &::-webkit-scrollbar{
            display: none;
        }

        .empty{
            width: 100%;
            height: 5rem;
            display: grid;
            place-items: center;

            @keyframes empty {
                0%{
                    opacity: 0;
                }
                100%{
                    opacity: 1;
                }
            }

            span{
                color: rgba(#3d3d3d, .7);
                animation: empty .3s forwards steps(20);
            }
        }


        ul{
            list-style-type: none;
            display: flex;
            flex-direction: column;
            align-content: flex-start;
            position: relative;

            li{
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                padding: 0.625rem 0.9375rem;
                display: block;
                transition: ease .3s;
                font-weight: 400;
                cursor: pointer;
                font-size: 0.9375rem;
                position: relative;
                color: rgba(#3d3d3d, .7);
                user-select: none;
                animation: enter .2s forwards ;

                .item-checkbox{
                    width: 0.9375rem;
                }

                @keyframes enter {
                    from{
                        transform: translateY(-0.3125rem);
                    }
                    to{
                        transform: translateY(0);
                    }
                }

                &.selected{
                    opacity: .4;
                    &::before{
                        height: 100%;
                        opacity: 1;
                    }
                }

                span.ind{
                    position: absolute;
                    right: 2%;
                    top: 50%;
                    transform: translate(0,-50%);
                    color: rgba(#3d3d3d, .3);
                    font-size: 0.875rem;
                }

                &::before{
                    content: '';
                    display: block;
                    width: 100%;
                    height: 0;
                    background: rgba(#3d3d3d, .2);
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    transition: ease .2s;
                    pointer-events: none;
                }

                &:hover::before{
                    height: 100%;
                    opacity: 1;
                }
            }
        }
    }

}
</style>