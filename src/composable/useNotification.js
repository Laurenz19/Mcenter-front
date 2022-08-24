import Vue from 'vue'

export default function useNotification(type, message){
    Vue.$toast(message, {
        type: type, //or "success", "error", "default", "info" and "warning"
        timeout: 2000
   });
}