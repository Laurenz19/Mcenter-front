<template>
   <div class="app_breadcrumb">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Library</li>
            </ol>
        </nav>
    </div> 
</template>

<script>
   export default {
    name:"BreadcrumbComponent",
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