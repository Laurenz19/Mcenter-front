import axios from 'axios'

export default async function readData(uri, next){
    try {
        await axios.get(`${uri}`).then((response)=>{
                console.log(response)
                return next(response);
            })
    } catch (error) {
        return next(error.response)
    }
}