<template>
        <div>
            <button type="button" class="collapsible" 
                @click="toogleOpenCollapse" 
                :style="[bordered ? {borderTop:'1px solid rgb(254, 254, 254)'}:null, {backgroundColor: s_primary_color, color:text_color}]"
            >
               <h4>{{title}}</h4>
               <span>
                <i class="uil uil-plus" v-if="!open"></i>
                <i class="uil uil-minus" v-else></i>
               </span>

            </button>
            <div class="collapse_content" v-show= "open">
                <slot name="content"></slot>
                <slot name="actions"></slot>
                <hr/>
            </div>
        </div>
</template>

<script>
import {ref, getCurrentInstance, computed, onBeforeMount} from 'vue'
import {getColor} from '../../../composables/useful'
    export default{
        name:'Collapsible',
        props:{
           show:{
            type: Boolean,
            default:false
           }, 
           title:{
            type:String,
            default:''
           },
           bordered: {
            type:Boolean,
            default:false
           },
            primary_color: String
        },  
        setup(props){
            let open = ref(props.show)
            let s_primary_color=  props.primary_color

            onBeforeMount(() => {
            });

            let toogleOpenCollapse = ()=>{
               open.value = !open.value
            }

            let text_color = computed(()=>{
                return getColor(s_primary_color.value)
            })

            return{
                toogleOpenCollapse, text_color, open, s_primary_color
            }
        }
    }
</script>

<style lang="scss" scoped>
    /* Style the button that is used to open and close the collapsible content */
.collapsible {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 8px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  display:flex;
  justify-content: space-between;
//   border-top: 1px solid rgb(254, 254, 254);

  h4{
    font-size: 15px;
  }

  i{
    font-size: 22px;
  }



}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active, .collapsible:hover {
  background-color: #ccc;
}

/* Style the collapsible content. Note: hidden by default */
.collapse_content {
  padding: 0 18px;
  /* display: none; */
  overflow: hidden;
  background-color: #fffefe;
}
</style>