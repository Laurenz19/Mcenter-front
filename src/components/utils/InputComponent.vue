<template>
    <li @dblclick="show = true, value = default_value, $emit('write', value)">
        <div>
            <div v-if="show" :style="{flexGrow:'1'}">
                <input type="text" class="form-control col-sm-12"  v-model="value" @keypress.enter="show=false, sendData()">
            </div>
             <span v-if="!show">{{default_value}}</span>
             <span class="delete" v-if="!show" @click="deleteData()"><i class="uil uil-times"></i></span>
        </div>
    </li>
</template>

<script>
import {ref, watch} from 'vue'
   export default {
    name:"InputComponent",
    emits:['write', 'valid', 'delete'],
    props:{
        default_value : String
    },
    setup(props, ctx){
        let show = ref(false)
        let value = ref('')

        watch(value, async()=>{
            ctx.emit('write', value.value)
        })

        let sendData = ()=>{
            ctx.emit('valid')
        }

        let deleteData = ()=>{
            ctx.emit('delete')
        }
        return{
            show, value, sendData, deleteData
        }
    }

   }
</script>

<style lang="scss" scoped>
 @import "../../../assets/scss/index";
.app-input{
    margin-bottom: 15px;
}

</style>