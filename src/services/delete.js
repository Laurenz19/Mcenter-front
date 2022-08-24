import axios from 'axios'

export default async function removeData(uri, next){
    try {
        await axios.delete(`${uri}`)
                   .then((response)=> {return next(response)})
    } catch (error) {
        console.log(error)
        return next(error.response)
    }
}