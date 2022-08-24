<template>
    <div class="app-modal" v-show="open">
        <div ref="content" class="app-modal-inner" 
             :class="[open ? 'show' : null]"
             :style="{width:size}"
        >
     
            <div class="app-modal-main-content">
                <div class="app-modal-header" :style="{backgroundColor:color,}">
                    <i class="uil uil-multiply" @click="toggleCloseModal"></i>
                </div>
                <div class="app-modal-content">
                    <slot name="content"></slot>
                    <div class="btn-action">
                        <button class="cancel-btn" @click="toggleCloseModal"> 
                            {{btnCloseText}}                   
                        </button>

                        <button class="save-btn" @click="toggleSave"> 
                            {{btnText}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
export default{
    name:"ModalComponent",
    emits:['close', 'save'],
    props:{
        open:{
            type:Boolean,
            default:true
        },
        size:String,
        btnCloseText:String,
        btnText:String,
        color:String
    },
    setup(props, ctx){
        let content = ref(null);

        let toggleCloseModal = ()=>{
            content.value.classList.remove('show')
            content.value.classList.add('hide')
            setTimeout(()=>{
                ctx.emit('close')
                content.value.classList.remove('hide')
            }, 700)
        }


        let toggleSave = ()=>{
            ctx.emit('save')
            toggleCloseModal()
        }

        return{
            toggleCloseModal, content, toggleSave
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/index";
    body{
        overflow: hidden;
    }
    
</style>