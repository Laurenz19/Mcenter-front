<template>
   <div class="header">
        <div class="title">
            {{title}}
        </div>
        <app-breadcrumb :title="title"></app-breadcrumb>
    </div> 
</template>

<script>
import BreadcrumbComponentVue from './BreadcrumbComponent.vue'

   export default {
    name:"HeaderComponent",
    components:{
        'app-breadcrumb':BreadcrumbComponentVue
    },
    props:{
        title:String
    }
   }
</script>

<style lang="scss">

</style>