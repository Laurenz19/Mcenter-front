<template>
    <dashboard>
        <template #app_content>
    
          <app-filter :data="patients" @updateDataSearch="(search)=> getuserSearch(search)">
            <template #filter_content>
                <button class="add" @click="isModalOpen = true, btnText = 'Valider'"><i class="uil uil-plus"></i></button>
            </template>
          </app-filter>
          <div class="app_card_list">
            <div class="card_item" v-for="patient in visibleData" :key="patient.id">
                <div class="item_content">
                    <img src="../assets/img/avatar.jpg"/>
                    <div class="user_info">
                        <span class="name">{{patient.firstname}} {{patient.lastname}}</span>
                        <span>{{patient.gender}}</span>
                        <span>{{patient.address}}</span>
                    </div>
                </div>
                 <hr>
                <div class="actions">
                    <i class="uil uil-edit" @click="editData(patient)"></i>
                    <i class="uil uil-trash" @click="deleteData(patient.id)"></i>
                </div>
            </div>
          </div>
          <app-pagination :config="paginationConfig" :color="colors.color_3" @updatePage="updatePage"></app-pagination>
          <app-modal :open="isModalOpen" @close="isModalOpen = false" @save="toggleSaveData"
            size="500px" :color="colors.color_1"
            btnCloseText="Annuler" :btnText="btnText" 
          >
            <template #content>
                <form action="">
                   <div class="input">
                     <label for="">Nom</label>
                     <input type="text" v-model="firstname" placeholder="Nom" :style="{outline:'none', border:'1px solid grey'}">
                   </div>
                    <div class="input">
                     <label for="">Prénoms</label>
                     <input type="text" v-model="lastname" placeholder="Prénoms" :style="{outline:'none', border:'1px solid grey'}">
                   </div>
                   <div class="input">
                     <label for="">Genre</label>
                     <select v-model="gender">
                       <option value="M">Homme</option>
                       <option value="F">Femme</option>
                     </select>
                   </div>
                   <div class="input">
                     <label for="">Adrèsse</label>
                     <input type="text" v-model="address" placeholder="Tanambao" :style="{outline:'none', border:'1px solid grey'}">
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

   export default {
    name:"PatientPage",
    components:{
        'dashboard': DashboardPage,
        'app-filter': FilterSearchComponentVue,
        'app-pagination': PaginationComponentVue,
        'app-modal': ModalComponentVue
    },
    setup(){


        let patients = ref([])
        let id = ref('')
        let data = ref([])
        let visibleData = ref([])
        data.value = patients.value

        let paginationConfig = ref({
                current:0,
                size:4,
                data: [],
                _data: []
        })

        let globalVariable = inject('globalVariable')
        let colors = ref(globalVariable.colors)
        let isModalOpen = ref(false)
        let btnText = ref('Valider')
        let firstname = ref('')
        let lastname = ref('')
        let gender = ref('')
        let address = ref('')
        let userSearch = ref('')

        onBeforeMount(() => {
           loadData()
        })

        let editData = (patient)=>{
            gender.value = patient.gender
            firstname.value= patient.firstname
            lastname.value= patient.lastname
            address.value= patient.address
            id.value = patient.id
            btnText.value = 'Modifier'
            isModalOpen.value= true

        }

        let loadData = ()=>{
             readData('/api/patients', (response)=>{
                console.log(response.data['hydra:member'])
                if(response.status == 200){
                    patients.value = response.data['hydra:member']
                    console.log(patients.value)
                    updateVisibleData(patients.value)
                    data.value=patients.value
                }
            })
        }

        let deleteData = (id)=>{
            removeData(`/api/patients/${id}`, (response)=>{
                console.log(response)
                if(response.status == 204){
                    loadData()
                }
            })
        }

        let toggleSaveData = ()=>{
            let patient = {
                "firstname": firstname.value,
                "lastname": lastname.value,
                "gender": gender.value,
                "address": address.value,
            }

            if(btnText.value == 'Valider'){
                console.log(patient)
                createData('/api/patients', patient, (response)=>{
                    console.log(response)
                    if(response.status == 201){
                        loadData()
                        gender.value = ''
                        firstname.value=''
                        lastname.value=''
                        address.value=''
                    }
                    
                })
            }else{
                console.log(patient)
                updateData(`/api/patients/${id.value}`, patient, (response)=>{
                    console.log(response)
                     if(response.status == 200){
                        loadData()
                        gender.value = ''
                        firstname.value=''
                        lastname.value=''
                        address.value=''
                        id.value = ''
                    }
                })
            }
        }

         let updatePage = function(pageNumber){
                paginationConfig.value.current = pageNumber;
                updateVisibleData(patients.value);
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
                data.forEach((patient)=>{
                        if(patient.firstname.match(userSearch.value) || patient.lastname.match(userSearch.value) || patient.address.match(userSearch.value)) tab.push(patient)
                })
               
            return tab
        }

        watch(userSearch, async () => {
            let data = toggleSearchFilter(patients.value)
            updateVisibleData(data)
        })

        let getuserSearch= (value)=>{
            userSearch.value = value
        }



        return{
            data, paginationConfig, colors, isModalOpen, btnText, editData
            , deleteData, toggleSaveData, firstname, lastname, patients, gender, address,
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
            justify-content: space-between;
            align-items: center;
            
            img{
                width:50px;
                height: 50px;
                border-radius: 50%;
            }

            .user_info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
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