import axios from "axios";


export async function getUserData() {
    
    try{
        var res = await axios.get('http://localhost:5000/getAll')
        return res.data
    }catch(err){
        console.log(err)
        return null
    }
    
}