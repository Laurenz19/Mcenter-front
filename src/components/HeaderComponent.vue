<template>
   <div class="header">
        <div class="title">
                    Dashboard
        </div>
        <app-breadcrumb></app-breadcrumb>
    </div> 
</template>

<script>
import BreadcrumbComponentVue from './BreadcrumbComponent.vue'

   export default {
    name:"HeaderComponent",
    components:{
        'app-breadcrumb':BreadcrumbComponentVue
    }
   }
</script>

<style lang="scss">

</style>