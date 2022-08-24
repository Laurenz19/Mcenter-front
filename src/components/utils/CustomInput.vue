<template>
  <div>
    <ul class="item" @click="show_input = true, value = default_value" @dblclick="show_input=false">
      <li class="field">
        {{title}}
      </li>
      <li class="value" v-if="!show_input">  {{default_value}}</li>
      <input type="text" class="form-control" v-if="show_input && is_input" v-model="value" @keypress.enter="show_input=false, sendData()">
      <textarea class="form-control" col="30" rows="5" v-model="value" v-if="show_input && is_textArea" @keypress.enter="show_input=false, sendData()"></textarea>
      <li class="actions" v-if="is_link">
            <span>
                <i class="uil uil-angle-right-b"></i>
            </span>
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, watch, onBeforeMount} from 'vue'
export default {
  name:"CustomInput",
  emits:['valid', 'write'],
  props:{
    title:{
      type: String,
      default: ''
    },
    is_link:{
      type: Boolean,
      default: false
    },
    is_input:{
      type: Boolean,
      default: false
    },
    is_textArea:{
      type: Boolean,
      default: false
    },
    default_value:String
  },
  setup(props, ctx){
    let show_input = ref(false)
    let value = ref('')
    watch(value, async()=>{
      ctx.emit('write', value.value)
    })
    let sendData = ()=>{
      ctx.emit('valid')
    }
    return{
      show_input, value, sendData
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/index.scss";
select:focus,input:focus, textarea:focus{
  border-color: v-bind(s_primary_color);;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 3px v-bind(s_primary_color);
  outline: 0 none;
}
</style>