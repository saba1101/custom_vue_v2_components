<template>
    <div ref="dropdown" class="selectTag-wrapper" @click="dropDownVisible = !dropDownVisible">
        <div :class="['selected-box',{'overflow':autoHeight}]">
            <div v-if="selectedItems.length <= 0" class="placeholder">
                <span>
                    Select Tags
                </span>
            </div>
            <div 
                :class="['item',{'editing':item.edit}]"
                v-for="(item,ind) in selectedItems" 
                :key="ind" 
                @click.stop=""  
                :style="[{flexGrow: flexGrow ? style.flexGrow : ''}]"
                @click="viewElement(item.id)"
            >
                <div class="item-title">
                    <span> {{item.title}} </span>
                </div>
                <div class="actions">
                    <div class="delete" @click.stop="removeItem(item)">
                        <svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="#fff" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						</svg>
                    </div>
                </div>
            </div>
        </div>
        <div :class="['arrow',{'up':dropDownVisible}]" @click.stop="dropDownVisible = !dropDownVisible">
            <svg class="svg-icon" viewBox="0 0 20 20">
                <path fill="#3361FF" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
            </svg>
        </div>
        <div class="dropdown" v-if="dropDownVisible" @click.stop="">
            <ul>
                <li class="add-new noHover" @click="createMode = !createMode">
                    <div v-if="!createMode" class="title">
                        <span>Add new item</span>
                    </div>
                    <div v-else class="addInput">
                        <input type="text" v-model="newItemTitle" placeholder="Item Name" @keyup="createInputHandler" ref="createInput" @click.stop="">
                        <div class="create-actions">
                            <div class="create" @click.stop="createNewItem">
                                <svg class="svg-icon" viewBox="0 0 20 20">
                                    <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>
                                </svg>
                            </div>
                            <div class="cancel" @click.stop="cancelCreation">
                                <svg class="svg-icon" viewBox="0 0 20 20">
                                    <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="search-item noHover">
                    <div class="input-wrapper">
                        <input type="text" placeholder="Search Items" v-model="searchString">
                    </div>
                    <div class="actions" @click.stop="clearSearchResults" v-if="searchString.length > 0">
                        <svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="#fff" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						</svg>
                    </div>
                </li>
                <li v-show="filteredArr(item.title)" :id="`target${item.id}`" :class="[{'selected':item.selected || item.edit,'editMode':item.edit}]" v-for="(item,ind) in data" :key="ind" @click.stop="selectItem(item)">
                    <div class="title" v-if="!item.edit">
                        <div :class="['custom-checkbox',{'checked': item.selected}]" v-if="withCheckbox">
                            <div class="check">

                            </div>
                        </div>
                        <span> {{item.title}} </span>
                    </div>
                    <div class="editInput" v-else>
                        <textarea type="text" v-model="item.title" @click.stop="" @keyup="editInputHandler" ref="editinput"> </textarea>
                    </div>
                    <div class="actions">
                        <div class="edit-item" @click.stop="editMode(item)">
                            <svg class="svg-icon" viewBox="0 0 20 20">
                                <path fill="#000" d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"></path>
                            </svg>
                        </div>
                        <div class="delete-item" @click.stop="deleteItem(item)">
                            <svg class="svg-icon" viewBox="0 0 20 20">
                                <path fill="#000" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                            </svg>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
export default {
    props:{
        data: Array,
        selectedItems: Array,
        withCheckbox: {
            type: Boolean,
            default: false,
        },
        flexGrow: Boolean,
        autoHeight: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return{
            dropDownVisible: false,
            createMode: false,
            newItemTitle: '',
            searchString: '',
            style:{
                flexGrow: 1,
            }
        }
    },
    watch:{
        dropDownVisible:{
            handler(val){
                if(!val){
                    this.data.forEach(el => el.edit = false)
                    this.clearSearchResults()
                }
            }
        },
        createMode:{
            handler(val){
                if(val){
                    this.$nextTick(() => {
                        this.$refs.createInput.focus()
                    })
                    this.data.forEach(el => el.edit = false)
                }
            }
        },
    },
    created(){
        document.addEventListener("click", this.clickHandler);
        document.addEventListener('keyup',this.handler)
        this.handler = function(e){
            if(e.key === "Escape" || e.keyCode === 27){
                this.dropDownVisible = false
            }
        }
    },
    beforeDestroy() {
        document.removeEventListener('keyup', this.handler);
    },
    methods:{
        removeItem(item){
            this.$emit('removeItem',item)
        },
        deleteItem(item){
            this.$emit('deleteItem',item)
        },
        selectItem(item){
            this.$emit('select',item)
        },
        clickHandler(event){
            if(event.path.includes(this.$refs.dropdown)) return
            this.dropDownVisible = false
        },
        editMode(item){
            this.$emit('editMode',item)
            this.$nextTick(() => {
                this.$refs.editinput[0].focus()
            })
        },
        createNewItem(){
            if(!this.newItemTitle.length || this.newItemTitle === null || this.newItemTitle === undefined || this.newItemTitle == '') return
            this.$emit('createNewItem',this.newItemTitle)
            this.createMode = false
            this.newItemTitle = ''
        },
        cancelCreation(){
            this.createMode = false
            this.newItemTitle = ''
        },
        createInputHandler(e){
            if(e.key === 'Enter' || e.keyCode === 13){
                this.createNewItem()
            }
        },
        editInputHandler(e){
            if(e.key === 'Enter' || e.keyCode === 13){
                this.data.forEach(el => el.edit = false)
            }
        },
        clearSearchResults(){
            this.searchString = ''
        },
        filteredArr(title){
            if(
                title.toLowerCase().split(' ').join('').trim().includes(this.searchString.toLowerCase().split(' ').join('').trim())
            ) return true
            else return false
        },
        viewElement(id){
            this.dropDownVisible = true
            this.$nextTick(() => {
                document.querySelector('.dropdown').scrollTo({top: document.querySelector(`#target${id}`).offsetTop - 100,behavior:'smooth'})
            })
        }
    },  
}
</script>

<style lang="scss" scoped>
.selectTag-wrapper{
    width: 100%;
    position: relative;
    background: #fff;
    border: 0.0625rem solid rgba(#3361FF,.5);
    box-shadow: 0rem 0rem 1.25rem rgba(#4d4d4d,.2);
    border-radius: 0.3125rem;
    z-index: 99;

    .arrow{
        position: absolute;
        top: 0.3125rem;
        right: 0.3125rem;
        transform: rotate(90deg);
        transition: ease .4s;
        cursor: pointer;

        &.up{
            transform: rotate(-90deg);
        }
        svg{
            width: 1.35rem;
        }
    }

    .selected-box{
        width: calc(100% - 2.1875rem);
        max-height: 9.375rem;
        min-height: 2.5rem;
        display: flex;
        align-items: center;
        overflow: auto;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 0.3125rem 0.625rem;
        &::-webkit-scrollbar{
            display: none;
        }

        &.overflow{
            overflow: unset !important;
            max-height: unset !important;
        }

        .item{
            padding: 0.1875rem 0.5rem;
            border-radius: 0.3125rem;
            background: rgba(#3361FF,.8);
            user-select: none;
            margin: 0.3125rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left: 0.3125rem;
            position: relative;
            overflow: hidden;
            box-shadow: 0rem 0rem 0.625rem rgba(#4d4d4d,.4);
            position: relative;

            &:hover{
                &::after{
                    opacity: 1;
                }
            }

            &::after{
                content: '';
                width: 100%;
                height: 0.1875rem;
                background: rgba(#fff, 1);
                position: absolute;
                left: 0;
                bottom: 0;
                border-bottom-left-radius: 0.3125rem;
                border-bottom-right-radius: 0.3125rem;
                transition: ease .2s;
                opacity: 0;
            }

            .actions{
                margin-left: 0.3125rem;
                display: flex;
                align-items: center;
                justify-content: left;

                .delete{
                    cursor: pointer;
                    padding-left: 0.1875rem;
                    margin-top: 0.1875rem;
                }

                .delete{
                    svg{
                        width: 1rem;
                    }
                }

            }

            .item-title{
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                color: #fff !important;
            }
        }

    }

    .dropdown{
        position: absolute;
        width: 100%;
        max-height: 25rem;
        overflow: auto;
        min-height: 6.25rem;
        left: 0;
        top: calc(100% - 0.125rem);
        border-top: none;
        border: 0.0625rem solid rgba(#3361FF,.5);
        background: #fff;
        border-bottom-left-radius: 0.3125rem;
        border-bottom-right-radius: 0.3125rem;
        animation: ease .5s fade;
        box-shadow: 0rem 0rem 0.625rem rgba(#4d4d4d, .1);
        @keyframes fade {
            from{
                opacity: 0;
            }
            to{
                opacity: 1;
            }
        }


        &::-webkit-scrollbar{
            display: none;
        }
        
        ul{
            width: 100%;
            list-style: none;
            box-sizing: border-box;

            li{
                width: 100%;
                height: 3rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                transition: ease .3s;
                padding: 0.3125rem 0.9375rem;
                cursor: pointer;
                border-bottom: 0.0625rem solid rgba(#3361FF,.2);
                position: relative;
                animation: forwards fade 1s;
                @keyframes fadeIn {
                    from{
                        opacity: 0;
                    }
                    to{
                        opacity: 1;
                    }
                }

                .title{
                    display: grid;
                    align-items: center;
                    grid-template-columns: auto auto;
                }

                .custom-checkbox{
                    width: 0.9375rem;
                    height: 0.9375rem;
                    border-radius: 50%;
                    border: solid 0.0625rem #3361FF;
                    position: relative;
                    margin-right: 1rem;
                    &.checked{
                        background: #3361FF;
                    }
                }

                &.add-new{
                    position: sticky;
                    top: 0;
                    background: #fff !important;
                    z-index: 9;

                    .title{
                        font-weight: 600;
                    }
                    .addInput{
                        width: 100%;
                        height: 100%;
                        position: relative;
                        input{
                            width: 100%;
                            height: 100%;
                            outline: none;
                            border: 0.0625rem solid rgba(#3361FF,.2);
                            font-size: 0.9375rem;
                            background: transparent;
                            box-sizing: border-box;
                            padding-left: 0.625rem;
                            padding-right: 4.375rem;
                        }

                        .create-actions{
                            position: absolute;
                            top: 50%;
                            transform: translate(0,-50%);
                            right: 0.625rem;
                            display: flex;
                            align-items: center;
                            justify-content: left;

                            .create,.cancel{
                                margin-left: 0.5rem;
                                svg{
                                    width: 1.4375rem;
                                    path{
                                        transition: ease .3s;
                                    }
                                }
                            }

                            .create{
                                &:hover{
                                    svg path{
                                        fill: rgba(#3d3, 1);
                                    }
                                }
                            }
                            .cancel{
                                &:hover{
                                    svg path{
                                        fill: rgba(indianred, 1);
                                    }
                                }
                            }

                        }


                    }
                }

                &.search-item{
                    width: 100%;
                    position: sticky;
                    top: 48px;
                    background: #fff;
                    z-index: 9;
                    .input-wrapper{
                        position: relative;
                        width: 100%;
                        height: 100%;
                        input{
                            width: 100%;
                            height: 100%;
                            border: 0.0625rem solid rgba(#3361FF,.2);
                            border-radius: 0.1875rem;
                            outline: none;
                            box-sizing: border-box;
                            padding: 0 0.4375rem;

                            &:focus{
                                box-shadow: 0rem 0rem 1.25rem rgba(#4d4d4d, .1);
                                border: 0.0625rem solid rgba(#3361FF,.4);
                            }

                            &::placeholder{
                                color: rgba(#4d4d4d,.5);
                                font-size: 0.875rem;
                            }
                        }

                    }

                    .actions{
                        position: absolute;
                        right: 1.5rem;
                        top: 50%;
                        transform: translate(0,-50%);
                        animation: fadeIn forwards .5s;
                        svg{
                            width: 1.25rem;
                            path{
                                fill: indianred;
                            }
                        }
                    }
                }


                .editInput{
                    width: 100%;
                    height: 100%;
                    margin-left: -0.3125rem;
                    padding-right: 0.3125rem;
                    textarea{
                        width: 100%;
                        height: calc(100% - 0.4375rem);
                        outline: none;
                        border: 0.0625rem solid rgba(#3361FF,.2);
                        font-size: 0.9375rem;
                        background: transparent;
                        box-sizing: border-box;
                        padding: 0.125rem 0.3125rem;
                        resize: none;
                    }
                    input{
                        width: 100%;
                        height: 100%;
                        outline: none;
                        border: 0.0625rem solid rgba(#3361FF,.2);
                        font-size: 0.9375rem;
                        background: transparent;
                        box-sizing: border-box;
                        padding: 0 0.3125rem;
                    }
                }

                &.editMode{
                    height: 7rem !important;
                }

                &.selected{
                    background: rgba(#3361FF,.1);

                    &:hover{
                        background: rgba(#3361FF,.1) !important;
                    }

                    .title > span{
                        color: rgba(#4d4d4d, .6) !important;
                    }

                    .actions{
                        svg{
                            path{
                                fill: #4d4d4d !important;
                            }
                        }
                    }

                    &::after{
                        content: '';
                        position: absolute;
                        width: 0.1875rem;
                        height: 100%;
                        bottom: 0;
                        left: 0;
                        background: rgba(#3361FF,.5);
                        transition: ease .3s;
                    }
                }

                &:hover:not(.noHover){
                    background: rgba(#3361FF,.5);

                    .title{
                        span{
                            color: #fff;
                        }
                    }

                    .actions{
                        svg{
                            path{
                                fill: #fff;
                            }
                        }
                    }
                }

                .title{
                    font-size: 1rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                }

                .actions{
                    display: flex;
                    align-items: center;
                    justify-content: left;

                    .delete-item,.edit-item{
                        cursor: pointer;
                        margin-left: 0.3125rem;
                    }
                    svg{
                        width: 1.25rem;
                        path{
                            transition: ease .2s;
                        }
                    }

                    .delete-item{
                        &:hover{
                            svg path{
                                fill:indianred;
                            }
                        }
                    }

                    .edit-item{
                        &:hover{
                            svg path{
                                fill:#283593;
                            }
                        }
                        svg{
                            width: 1rem !important;
                        }
                    }

                }
            }
        }
    }

}
</style>