<template>
    <div class="search-app">
        <div class="filter">
           <slot name="filter_content"></slot>
        </div>
        <div class="search-filter">
            <!-- <div class="select-box">
                <select v-model="progress_filter">
                    <option v-for="filter in config.filters" :value="filter._value" :key="filter">{{filter.label}}</option>
                </select>
            </div> -->
            <div class="search-bar">
                <input type="text" placeholder="Rechercher" v-model="userSearch">
                <i class="uil uil-search"></i>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, watch} from 'vue'
    export default{
        name: "FilterSearch",
        props:{
            data:Array,
        },
        emits:['updateView', 'updateDataFilter', 'updateDataSearch'],
        setup(props, ctx){
            let userSearch = ref('');

            watch(userSearch, async () => {
                ctx.emit('updateDataSearch', userSearch.value)
            })

            return{
             userSearch
            }
        }
    }
</script>

<style lang="scss">
    .search-app{
        padding: 15px !important;
    }
</style>