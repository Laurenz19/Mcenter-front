<template>
   <div class="card_item">
        <div class="item_content">
            <img src="../assets/img/avatar.jpg"/>
            <div class="user_info">
                <span class="name">{{medecin.firstname}} {{medecin.lastname}}</span>
                <span>{{medecin.matricule}}</span>
                <span>{{medecin.grade}}</span>
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
   export default {
    name:'DoctorCard',
    props:{
        medecin:Object
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
            deleteData, editData
        }
    }
   }
</script>

<style lang="scss" scoped>
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
            // left: -8px;

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
    
    hr{
        margin: 0px;
        margin-top: 5px;
    }
</style>