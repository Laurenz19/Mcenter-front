<template>
    <dashboard title="Medecin">
        <template #app_content>
    
          <app-filter :data="doctors" @updateDataSearch="(search)=> getuserSearch(search)">
            <template #filter_content>
                <button class="add" @click="isModalOpen = true, btnText = 'Valider'"><i class="uil uil-plus"></i></button>
            </template>
          </app-filter>
          <div class="app_card_list">
            <DoctorsCardVue v-for="medecin in visibleData" :key="medecin.id" :medecin="medecin" @edit="editData(medecin)" @delete="deleteData(medecin.id)"/>
          </div>
          <app-pagination :config="paginationConfig" :color="colors.color_3" @updatePage="updatePage"></app-pagination>
          <app-modal :open="isModalOpen" @close="isModalOpen = false" @save="toggleSaveData"
            size="500px" :color="colors.color_1"
            btnCloseText="Annuler" :btnText="btnText" 
          >
            <template #content>
                <form action="">
                   <div class="input">
                     <label for="">N° Matricule</label>
                     <input type="text" v-model="code" placeholder="831-HF" :style="{outline:'none', border:'1px solid grey'}">
                   </div>
                   <div class="input">
                     <label for="">Nom</label>
                     <input type="text" v-model="firstname" placeholder="Nom" :style="{outline:'none', border:'1px solid grey'}">
                   </div>
                    <div class="input">
                     <label for="">Prénoms</label>
                     <input type="text" v-model="lastname" placeholder="Prénoms" :style="{outline:'none', border:'1px solid grey'}">
                   </div>
                    <div class="input">
                     <label for="">Grade</label>
                     <input type="text" v-model="grade" placeholder="Medecin" :style="{outline:'none', border:'1px solid grey'}">
                   </div>
                </form>
            
            </template>
          </app-modal>
        </template>
    </dashboard>
</template>

<script>
import {ref, inject, onBeforeMount, watch} from 'vue'
import DashboardPage from './Dashboard.vue'
import PaginationComponentVue from '@/components/utils/PaginationComponent.vue';
import FilterSearchComponentVue from '@/components/utils/FilterSearchComponent.vue';
import ModalComponentVue from '@/components/utils/ModalComponent.vue';
import readData from '../services/read'
import createData from '@/services/create';
import removeData from '@/services/delete';
import updateData from '@/services/update';
import useNotification from '../composable/useNotification'
import DoctorsCardVue from '@/components/DoctorsCard.vue';


   export default {
    name:"DoctorsPage",
    components:{
    "dashboard": DashboardPage,
    "app-filter": FilterSearchComponentVue,
    "app-pagination": PaginationComponentVue,
    "app-modal": ModalComponentVue,
    DoctorsCardVue,
},
    setup(){


        let doctors = ref([])
        let id = ref('')
        let data = ref([])
        let visibleData = ref([])
        data.value = doctors.value

        let paginationConfig = ref({
                current:0,
                size:5,
                data: [],
                _data: []
        })

        let globalVariable = inject('globalVariable')
        let colors = ref(globalVariable.colors)
        let isModalOpen = ref(false)
        let btnText = ref('Valider')
        let firstname = ref('')
        let lastname = ref('')
        let grade = ref('')
        let code = ref('')
        let userSearch = ref('')

        onBeforeMount(() => {
           loadData()
        })

        let editData = (medecin)=>{
            code.value = medecin.matricule
            firstname.value= medecin.firstname
            lastname.value= medecin.lastname
            grade.value= medecin.grade
            id.value = medecin.id
            btnText.value = 'Modifier'
            isModalOpen.value= true

        }

        let loadData = ()=>{
             readData('/api/doctors', (response)=>{
                console.log(response.data['hydra:member'])
                if(response.status == 200){
                    doctors.value = response.data['hydra:member']
                    console.log(doctors.value)
                    updateVisibleData(doctors.value)
                    data.value=doctors.value
                }
            })
        }

        let deleteData = (id)=>{
            removeData(`/api/doctors/${id}`, (response)=>{
                console.log(response)
                if(response.status == 204){
                    loadData()
                    useNotification('warning', 'Suppréssion éffectuée!')
                }

                if(response.status == 500){
                     useNotification('error', 'Impossible à supprimer!')
                }
            })
        }

        let toggleSaveData = ()=>{
            let doctor = {
                matricule: code.value,
                firstname: firstname.value,
                lastname: lastname.value,
                grade: grade.value
            }

            if(code.value == '' || firstname.value == '' || lastname.value == '' || grade.value == ''){
                useNotification('warning', 'Veuillez remplir correctement les champs!')
            }else{
                 if(btnText.value == 'Valider'){
                console.log(doctor)
                createData('/api/doctors', doctor, (response)=>{
                    console.log(response)
                    if(response.status == 201){
                        loadData()
                        useNotification('success', 'Ajout éffectué avec succès')
                        isModalOpen.value= false
                        code.value = ''
                        firstname.value=''
                        lastname.value=''
                        grade.value=''
                    }
                    
                })
            }else{
                console.log(doctor)
                updateData(`/api/doctors/${id.value}`, doctor, (response)=>{
                    console.log(response)
                     if(response.status == 200){
                        loadData()
                        useNotification('success', 'Modification éffectuée avec succès')
                        isModalOpen.value= false
                        code.value = ''
                        firstname.value=''
                        lastname.value=''
                        grade.value=''
                        id.value = ''
                    }
                })
            }
            }

           
        }

         let updatePage = function(pageNumber){
                paginationConfig.value.current = pageNumber;
                updateVisibleData(doctors.value);
        }

         let updateVisibleData = function(_data){
                let data = paginationConfig.value;

                paginationConfig.value.data = _data.slice(data.current*data.size, (data.current * data.size) + data.size)
                

                if (paginationConfig.value.data.length == 0 && paginationConfig.value.current > 0) {
                    updatePage( paginationConfig.value.current -1);
                }

                visibleData.value = paginationConfig.value.data
        }

        let toggleSearchFilter = function(data){
            let tab = [];
                data.forEach((doctor)=>{
                        if(doctor.firstname.match(userSearch.value) || doctor.lastname.match(userSearch.value) || doctor.matricule.match(userSearch.value) || doctor.grade.match(userSearch.value)) tab.push(doctor)
                })
               
            return tab
        }

        watch(userSearch, async () => {
            let data = toggleSearchFilter(doctors.value)
            updateVisibleData(data)
        })

        let getuserSearch= (value)=>{
            userSearch.value = value
        }



        return{
            data, paginationConfig, colors, isModalOpen, btnText, editData
            , deleteData, toggleSaveData, firstname, lastname, grade, code, doctors,
            visibleData, updatePage, userSearch, getuserSearch
        }
    }
   }
</script>

<style lang="scss" scoped>
   .app_card_list{
    width: 80%;
    margin: 60px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .card_item{
        height: 17vh;
        box-shadow: 3px 3px 15px 0px rgba(42, 43, 53, 0.15);
        flex-basis: 300px;
        width: 300px;
        margin: 20px;
        cursor: pointer;
        border-radius: 15px;

        &:hover{
            transform: scale(1.05);
            transition: all 0.5s ease;
        }

        .item_content{
            display: flex;
            padding: 10px;
            position: relative;
            top:8px;
            justify-content: space-around;
            align-items: center;
            
            img{
                width:50px;
                height: 50px;
                border-radius: 50%;
            }

            .user_info{
                display: flex;
                flex-direction: column;
                font-size: 14px;
                color: rgb(95, 101, 103);

                .name{
                    font-size: 15px;
                    font-weight: bold;
                    color: rgb(132, 132, 132);
                }

            }
        }

        .actions{
            display: flex;
            justify-content: flex-end;
            position: relative;
            // align-items: center;
            left: -8px;

            i{
                margin: 5px;
            }
            
            .uil-trash:hover{
                color: red;
            }

            .uil-edit:hover{
                color: greenyellow;
            }
        }
    }
   }

   hr{
    margin: 0px;
    margin-top: 5px;
   }

   .add{
    border: none;
    padding: 3px 10px;
    border-radius: 15px;
    background-color: v-bind('colors.color_3');
    box-shadow: 3px 3px 15px 0px rgba(42, 43, 53, 0.15);
   
    i{
         color: white;
    }

    &:hover{
        box-shadow: 3px 3px 15px 0px rgba(42, 43, 53, 0.25);
    }

   }

   .input{
    display: flex;
    flex-direction: column;
    margin: 2px;
    padding: 5px 20px;

    label{
        font-size: 13px;
        color: rgb(105, 105, 105);
        font-weight: bold;
    }

    input{
       border-radius: 5px;
       padding: 2px 5px;
       height: 30px;
       font-size: 14px;

       &:hover{
        border:'1px solid grey'
       }

    }
   }

</style>