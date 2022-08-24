<template>
    <dashboard title="Visite">
        <template #app_content>
    
          <app-filter :data="visits" @updateDataSearch="(search)=> getuserSearch(search)">
            <template #filter_content>
                <button class="add" @click="isModalOpen = true, btnText = 'Valider'"><i class="uil uil-plus"></i></button>
            </template>
          </app-filter>
          <div class="app_card_list">
            <VisitCard v-for="visit in visibleData" :key="visit.id" :visit="visit" @edit="editData(visit)" @delete="deleteData(visit.id)"/>
          </div>
          <app-modal :open="isModalOpen" @close="isModalOpen = false" @save="toggleSaveData"
            size="500px" :color="colors.color_1"
            btnCloseText="Annuler" :btnText="btnText" 
          >
            <template #content>
                <form action="">
                   <div class="input">
                     <label for="">Doctor</label>
                      <select v-model="selected_doctor">
                        <option :value="doctor['@id']" v-for="doctor in doctors" :key="doctor.id">{{doctor.lastname}} {{doctor.firstname}}</option>
                      </select>
                   </div>
                    <div class="input">
                     <label for="">Patient</label>
                       <select v-model="selected_patient">
                        <option :value="patient['@id']" v-for="patient in patients" :key="patient.id">{{patient.lastname}} {{patient.firstname}}</option>
                      </select>
                   </div>
                   <div class="input">
                     <label for="">Date</label>
                     <input type="date" v-model="date">
                   </div>
                </form>
            
            </template>
          </app-modal>
          <app-pagination :config="paginationConfig" :color="colors.color_3" @updatePage="updatePage"></app-pagination>
        </template>
    </dashboard>
</template>

<script>
import {ref, inject, onBeforeMount, watch} from 'vue'
import DashboardPage from './Dashboard.vue'
import PaginationComponentVue from '@/components/utils/PaginationComponent.vue';
import FilterSearchComponentVue from '@/components/utils/FilterSearchComponent.vue';
import ModalComponentVue from '@/components/utils/ModalComponent.vue';
import moment from 'moment';
import readData from '../services/read'
import createData from '@/services/create';
import removeData from '@/services/delete';
import updateData from '@/services/update';
import useNotification from '@/composable/useNotification';
import VisitCard from '@/components/VisitCard.vue';

   export default {
    name:"VisitPage",
    components:{
    "dashboard": DashboardPage,
    "app-filter": FilterSearchComponentVue,
    "app-pagination": PaginationComponentVue,
    "app-modal": ModalComponentVue,
    VisitCard
},
    setup(){


        let visits = ref([])
        let id = ref('')
        let data = ref([])
        let visibleData = ref([])
        data.value = visits.value

        let paginationConfig = ref({
                current:0,
                size:2,
                data: [],
                _data: []
        })

        let globalVariable = inject('globalVariable')
        let colors = ref(globalVariable.colors)
        let isModalOpen = ref(false)
        let btnText = ref('Valider')
        let userSearch = ref('')
        let selected_doctor = ref('')
        let selected_patient = ref('')
        let date = ref('')
        let doctors = ref([])
        let patients = ref([])

        onBeforeMount(() => {
           loadData()
        })

        let editData = (visit)=>{
            selected_doctor.value = visit.medecin['@id']
            selected_patient.value = visit.patient['@id']
            date.value= moment(visit.date).format("YYYY-MM-DD")
            id.value = visit.id
            btnText.value = 'Modifier'
            isModalOpen.value= true

        }

        let loadData = ()=>{
             readData('/api/visits', (response)=>{
                console.log(response.data['hydra:member'])
                if(response.status == 200){
                    visits.value = response.data['hydra:member']
                    console.log(visits.value)
                    updateVisibleData(visits.value)
                    data.value=visits.value
                }
            })
            readData('/api/doctors', (response)=>{
                console.log(response.data['hydra:member'])
                if(response.status == 200){
                    doctors.value = response.data['hydra:member']
                }
            })

            readData('/api/patients', (response)=>{
                console.log(response.data['hydra:member'])
                if(response.status == 200){
                    patients.value = response.data['hydra:member']
                }
            })
        }

        let deleteData = (id)=>{
            console.log(id)
            removeData(`/api/visits/${id}`, (response)=>{
                console.log(response)
                if(response.status == 204){
                    loadData()
                    useNotification('warning', 'Suppréssion éffectuée!')
                }
            })
        }

        let toggleSaveData = ()=>{
            let visit = {
                "medecin": selected_doctor.value,
                "patient": selected_patient.value,
                "date": new Date(date.value)
            }
            
            
            if(selected_doctor.value == '' || selected_patient.value == '' || date.value == ''){
                 useNotification('warning', 'Veuillez remplir correctement les champs!')
            }else{
                if(btnText.value == 'Valider'){
               
                createData('/api/visits', visit, (response)=>{
                    console.log(response)
                    if(response.status == 201){
                        loadData()
                        useNotification('success', 'Ajout éffectué avec succès')
                        isModalOpen.value= false
                        selected_doctor.value=''
                        selected_patient.value=''
                        date.value = ''
                        
                    }
                    
                })
            }else{
               
                updateData(`/api/visits/${id.value}`, visit, (response)=>{
                    console.log(response)
                     if(response.status == 200){
                        loadData()
                        useNotification('success', 'Modification éffectuée avec succès')
                        isModalOpen.value= false
                        selected_doctor.value=''
                        selected_patient.value=''
                        date.value = ''
                        id.value = ''
                    }
                })
            }
            }
            
        }

         let updatePage = function(pageNumber){
                paginationConfig.value.current = pageNumber;
                updateVisibleData(visits.value);
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
                data.forEach((visit)=>{
                        if(visit.medecin.firstname.match(userSearch.value) || visit.medecin.lastname.match(userSearch.value) || visit.patient.firstname.match(userSearch.value) || visit.patient.lastname.match(userSearch.value)) tab.push(visit)
                })
               
            return tab
        }

        watch(userSearch, async () => {
            let data = toggleSearchFilter(visits.value)
            updateVisibleData(data)
        })

        let getuserSearch= (value)=>{
            userSearch.value = value
        }



        return{
            data, paginationConfig, colors, isModalOpen, btnText, editData
            , deleteData, toggleSaveData, visits,
            visibleData, updatePage, userSearch, getuserSearch, selected_doctor, doctors, patients,
            selected_patient, date, moment
            
        }
    }
   }
</script>

<style lang="scss" scoped>
   .app_card_list{
    width: 80%;
    margin: 15px auto;
    display: flex;
    justify-content: center;
    // flex-direction: column;
    flex-wrap: wrap;
    
    .visit_card{
        background-color: white;
        box-shadow: 3px 3px 15px 0px rgba(42, 43, 53, 0.15);
        // flex-grow: 1;
        margin: 15px;
        cursor: pointer;
        border-radius: 10px;
        padding: 15px;
        width: 500px;

        &:hover{
            transform: scale(1.05);
            transition: all 0.5s;
        }

        &:not(:hover){
            transform: scale(1);
            transition: all 0.5s;
        }

        .visitcontainer{
            display: flex;
            justify-content: space-between;

            div{
                flex-basis: 50%;

            }
        }

        .actions{
            display: flex;
            justify-content: flex-end;
            margin: 5px;

            i{
                margin: 0 5px;
                cursor: pointer;
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