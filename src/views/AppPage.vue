<template>
    <div class="app-container">
        <div class="navbar">
            <div class="navbar-content">
                <div class="nav_title">
                    <i class="uil uil-hospital-square-sign"></i> 
                    <ul>
                        <li class="li1">Visite</li>
                        <li class="li2">Medical</li>
                    </ul>
                </div>
                <div class="nav-menu">
                    <div class="menu-item active">
                        <span class="icon">
                             <i class="uil uil-hospital-square-sign"></i> 
                        </span>
                        <span class="label">
                            Dashboard
                        </span>
                    </div>
                     <div class="menu-item">
                        <span class="icon">
                             <i class="uil uil-hospital-square-sign"></i> 
                        </span>
                        <span class="label">
                            Dashboard
                        </span>
                    </div>
                     <div class="menu-item">
                        <span class="icon">
                             <i class="uil uil-hospital-square-sign"></i> 
                        </span>
                        <span class="label">
                            Dashboard
                        </span>
                    </div>
                     <div class="menu-item">
                        <span class="icon">
                             <i class="uil uil-hospital-square-sign"></i> 
                        </span>
                        <span class="label">
                            Dashboard
                        </span>
                    </div>
                     <div class="menu-item">
                        <span class="icon">
                             <i class="uil uil-hospital-square-sign"></i> 
                        </span>
                        <span class="label">
                            Dashboard
                        </span>
                    </div>
                     <div class="menu-item">
                        <span class="icon">
                             <i class="uil uil-hospital-square-sign"></i> 
                        </span>
                        <span class="label">
                            Dashboard
                        </span>
                    </div>

                </div>
            </div>
        </div>
        <div class="container">
            <div class="header">
                <div class="title">
                    Dashboard
                </div>
                <div class="breadcrumb">
                    Home / link_1 / link_2
                </div>
            </div>
            <div class="app">
                <h1>Default form</h1>
                <form action="">
                  <input type="text">
                </form>
            </div>
        </div>
    </div>
</template>
<script>
   export default {
    
   }
</script>

<style lang="scss" scoped>
    .app-container{
        display: flex;
        justify-content: space-between;

        .navbar{
            flex-basis: 200px;
            flex-grow: 1;
            // border-right: 1px solid grey;
            box-shadow: 3px 3px 15px 0px rgba(42, 43, 53, 0.1);

            .navbar-content{
                height: 100vh;
            
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
                
                .nav-menu{
                    position: relative;
                    top:60px;

                    .menu-item{
                        padding: 15px 15px  10px 20px;
                        width: 65%;
                        height: 30px;
                        margin: 20px auto;
                        cursor: pointer;
                        border-radius: 14px;

                        .icon{
                            padding: 8px 8px;
                            background-color: white;
                            border-radius: 8px;
                            box-shadow: 3px 3px 15px 0px rgba(42, 43, 53, 0.1);
                        }

                        .label{
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

                        .icon{
                            background-color: #02718A;
                            color: white;
                        }

                        .label{
                            color: #3f5053;
                            font-weight: bold;
                        }
                    }
                }
            }
        }

        .container{
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

                .breadcrumb{
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


    @media screen and (max-width: 1450px){
        .menu-item{
            .icon{
               margin: auto;
               display: block;
               text-align: center;
            }
            .label{
                display: none;
            }
        }

        .active{
        //    background-color: none !important;
        }
    }
   
</style>