<template>
    <div class="container">
        <div class="row" v-show="loading == true">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {
        name: 'SkeletonLoader',
        props: {
            loading: {
                type: Boolean,
                default: false,
                required: true
            }
        }
    }
</script>