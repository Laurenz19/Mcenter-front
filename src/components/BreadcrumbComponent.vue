<template>
   <div class="app_breadcrumb">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{title}}</li>
            </ol>
        </nav>
    </div> 
</template>

<script>
   export default {
    name:"BreadcrumbComponent",
    props:{
        title: String
    }
   }
</script>

<style lang="scss" scoped>
    li{
        color: white;

        a{
            text-decoration: none;
            color: white;
        }
    }
</style>