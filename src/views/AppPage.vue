<template>
    <div class="app_container">
        <app-navbar></app-navbar>
        <div class="main_container">
           <app-header></app-header>
            <div class="app">
              <slot name="app_content"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderComponentVue from '@/components/HeaderComponent.vue'
import NavbarComponentVue from '@/components/NavbarComponent.vue'

   export default {
    name:"DefaultPage",
    components:{
        'app-navbar':NavbarComponentVue,
        'app-header': HeaderComponentVue
    }
   }
</script>

<style lang="scss">
    .app_container{
        display: flex;
        justify-content: space-between;

        .navbar{
            flex-basis: 200px;
            flex-grow: 1;
            // border-right: 1px solid grey;
            box-shadow: 3px 3px 15px 0px rgba(42, 43, 53, 0.1);

            .navbar_content{
                height: 100vh;
                width: 100%;
                display: block;
            
                .nav_title{
                    display: flex;
                    justify-content: center;
                    margin: 10px 10px 0px 0px;
                    position: relative;
                    top:30px;

                    i{      
                        font-size: 40px;
                        margin-right: 5px;
                    }
                    ul{
                        padding: 0%;
                        margin: 0%;
                        font-weight: bold;
                        list-style: none;
                        font-size: 15px;

                        .li2{
                             font-size: 20px;
                        }
                    }
                }
                
                .nav_menu{
                    position: relative;
                    top:60px;
                    display: flex;
                    flex-direction: column;

                    .menu_item{
                        padding: 5px 5px  5px 5px;
                        width: 80%;
                        height: 30px;
                        margin: 20px auto;
                        cursor: pointer;
                        border-radius: 14px;

                        .menu_icon{
                            padding: 8px 8px;
                            background-color: white;
                            border-radius: 8px;
                            box-shadow: 3px 3px 15px 0px rgba(42, 43, 53, 0.1);
                        }

                        .menu_label{
                            font-size: 16px;
                            color: #778D98;
                            margin: 0px 15px
                        }

                        i{
                            font-size: 20px;
                            font-weight: bold;
                        }
                    }

                    .active{
                        // background-color: white;

                        .menu_icon{
                            background-color: #02718A;
                            color: white;
                        }

                        .menu_label{
                            color: #3f5053;
                            font-weight: bold;
                        }
                    } 
                }
            }
        }

        .main_container{
            flex-basis: 1000px;
            flex-grow: 4;

            .header{
                // background-image: url('/src/assets/header_photo.jpg');
                background-position: center;
                background-size: cover;
                margin: 15px;
                height: 13vh;
                border-radius: 10px;
                box-shadow: 3px 3px 15px 0px rgba(42, 43, 53, 0.1);
                background-color: #003541;
                color: white;
                display: flex;
                justify-content: space-between;

                .title{
                    position: relative;
                    left: 15px;
                    top:15px;
                    font-size: 18px;
                }

                .app_breadcrumb{
                    position: relative;
                    align-self: flex-end;
                    margin: 20px;
                    left: -100px;
                    font-size: 16px;
                }
                
            }

            .app{
                margin: 15px;
            }

        }
    }


    @media screen and (max-width: 1480px){
        .menu_item{
            width:50% !important;
            margin: auto;
            .menu_icon{
               margin: auto;
               display: block;
               text-align: center;
            }
            .menu_label{
                display: none;
            }
        }

        .nav_title{
            i{      
                font-size: 25px;
            }
            ul{
                font-size: 15px;

                .li2{
                    font-size: 10px;
               }
            }
        }
    }
   
</style>