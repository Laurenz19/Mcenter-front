<template>
     <label class="switch">
        
        <input type="checkbox" @click="toggleCheckbox"/>
        <div class="slider round" :style="[checkbox ? {backgroundColor: colors.color_1}: null]"></div>
     </label>
</template>

<script>
import {ref, computed} from 'vue'
import { useStore } from 'vuex'

export default{
    name:"SwitchComponent",
    emits:['switched'],
    setup(props, ctx){
        const store = useStore();

        let checkbox = ref(false)
        let slider = ref('slider')

        let colors = ref({});
        let inst = computed(()=>{
            return store.getters.getInstitut
        });

        colors = inst.colors;

        let toggleCheckbox = ()=> {
            checkbox.value = !checkbox.value
            ctx.emit('switched', checkbox.value)
        }
        return{
            checkbox, toggleCheckbox, slider, colors
        }
    }
}

</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  left: 4px;
  top:2.8px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

/* input:checked + .slider {
  background-color: #0071bc;
}

input:focus + .slider {
  box-shadow: 0 0 1px #0071bc;
} */

input:checked + .slider:before {
  -webkit-transform: translateX(23px);
  -ms-transform: translateX(23px);
  transform: translateX(23px);
}

.slider.round {
  border-radius: 40px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>