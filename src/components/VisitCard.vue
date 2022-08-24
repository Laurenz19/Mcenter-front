<template>
    <div class="visit_card">
        <div class="item"><span>{{moment(visit.date).format("MMMM Do YYYY")}}</span></div>
            <div class="visitcontainer"> 
                <div class="field">
                    <div class="title">Doctor</div>
                    <div class="item"><label for="">N°:</label> <span>{{visit.medecin.matricule}}</span></div>
                    <div class="item"><label for="">Name:</label> <span>{{visit.medecin.firstname}} {{visit.medecin.lastname}}</span></div>
                </div> 
                   
                <div class="field">
                    <div class="title">Patient</div>
                    <div class="item"><span>{{visit.patient.firstname}} {{visit.patient.lastname}}</span></div>
                    <div class="item">
                        <span v-if="visit.patient.gender == 'M'">Homme</span>
                        <span v-if="visit.patient.gender == 'F'">Femme</span>
                    </div>
                <div class="item"><span>{{visit.patient.address}} </span></div>
            </div>
        </div>
        <hr>
        <div class="actions">
            <i class="uil uil-edit" @click="editData()"></i>
            <i class="uil uil-trash" @click="deleteData()"></i>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
   export default {
    name:'VisitCard',
    props:{
        visit:Object
    },
    emits:['edit', 'delete'],
    setup(props, ctx){

        let editData = ()=>{
            ctx.emit('edit')
        }

        let deleteData = ()=>{
            ctx.emit('delete')
        }

        return{
            deleteData, editData, moment
        }
    }
   }
</script>

<style lang="scss" scoped>
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

    hr{
        margin: 0px;
        margin-top: 5px;
    }
</style>