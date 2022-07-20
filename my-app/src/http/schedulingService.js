import axios from 'axios'

export default class SchedulingService
{
    static async login(user)
    {
        try{
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/login',
                data: {
                    'email': user.email,
                    'password': user.password,
                },
                headers: {
                  'Content-Type': 'application/json'
                } 
            })
            return response.data
        }catch(e){
            console.log(e)
        }
    }
    static async register(user)
    {
        try{
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/register',
                data: {
                    'username': user.username,
                    'email': user.email,
                    'password': user.password,
                },
                headers: {
                  'Content-Type': 'application/json'
                } 
            })
            return response.data
        }catch(e){
            console.log(e)
        }
    }
}