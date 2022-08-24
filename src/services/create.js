import axios from 'axios'

export default async function createData(uri, data, next){
    try {
        await axios.post(`${uri}`, data)
                   .then((response)=> {return next(response)})
    } catch (error) {
        return next(error.response)
    }
}