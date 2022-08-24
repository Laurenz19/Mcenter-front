<template>
   <div class="navbar">
            <div class="navbar_content">
                <div class="nav_title">
                    <i class="uil uil-hospital-square-sign"></i> 
                    <ul>
                        <li class="li1">Visite</li>
                        <li class="li2">Medical</li>
                    </ul>
                </div>
                <div class="nav_menu">
                    <div class="menu_item">
                     <router-link :to="{name:'dashboard'}">
                        <span class="menu_icon">
                             <i class="uil uil-dashboard"></i>
                        </span>
                        <span class="menu_label">
                            Dashboard
                        </span>
                     </router-link>
                    </div>
                     <div class="menu_item">
                        <router-link :to="{name:'doctor'}">
                            <span class="menu_icon">
                                <i class="uil uil-user-md"></i>
                            </span>
                            <span class="menu_label">
                                Doctors
                            </span>
                       </router-link>
                    </div>
                     <div class="menu_item">
                        <router-link :to="{name:'patient'}">
                            <span class="menu_icon">
                               <i class="uil uil-user-nurse"></i>
                            </span>
                            <span class="menu_label">
                                Patients
                            </span>
                        </router-link>
                    </div>
                    <div class="menu_item">
                        <router-link :to="{name:'visit'}">
                            <span class="menu_icon">
                              <i class="uil uil-medical-square-full"></i>
                            </span>
                            <span class="menu_label">
                                Visits
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div> 
</template>

<script>
   export default {
    name:"NavbarComponent",
   }
</script>

<style lang="scss">
    .menu_item{
        .router-link-exact-active {
             color: #3f5053;
             font-weight: bold;

            .menu_icon{
                background-color: #02718A !important;
                color: white !important;

                i{
                    color: white !important;
                }
            }

            .menu_label{
                color: #3f5053 !important;
                font-weight: bold !important;
            }
        }    
    }

    a{
        text-decoration: none;
    }
    
</style>