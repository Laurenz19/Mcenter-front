import axios from 'axios'

export default async function updateData(uri, data, next){
    try {
        await axios.put(`${uri}`, data)
                   .then((response)=> {return next(response)})
    } catch (error) {
        return next(error.response)
    }
}