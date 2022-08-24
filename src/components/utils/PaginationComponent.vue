<template>
  <div class="pagination">
    <div class="pagination-content">
        <div class="previous-btn" @click=" showPreviousLink() ? updatePage(config.current - 1) : null" :style="{}">
            <i class="uil uil-angle-left-b"></i>
        </div>
        <div class="current-page" :style="{backgroundColor:color, color:'white'}">
           {{ config.current + 1 }}
        </div>
        <div class="next-btn" @click="updatePage(config.current+ 1)">
            <i class="uil uil-angle-right-b"></i>
        </div>
    </div>
  </div>
</template>

<script>
    export default{
        name:"PaginationComponent",
        props:{
            config:Object,
            color: String,
        },
        emits:['updatePage'],
        setup(props, ctx){

            let updatePage = function(pageNumber){
                ctx.emit('updatePage', pageNumber)
            }

            let totalPages = function(){
                console.log(Math.ceil(props.config._data.length / props.config.size))
                 return Math.ceil(props.config._data.length / props.config.size);
            }

            let showPreviousLink = function(){
                 return props.config.current == 0 ? false : true;
            }

            let showNextLink = function(){
                 return  props.config.current == (totalPages()-1) ? false : true;
            }

            return{
                updatePage, totalPages, showPreviousLink,
                showNextLink
            }
        }

    }
</script>

<style scoped>
    span{
        cursor: pointer;
    }
</style>

