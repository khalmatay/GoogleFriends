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
    static async logout()
    {
        try{
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/logout',
                data: {
                },
                headers: {
                  'Content-Type': 'application/json'
                } 
            })
            console.log(response.data)
            localStorage.removeItem('token')
                return response.data
        }catch(e){
            console.log(e)
        }
    }
    
    
    static async getUsers(user)
    {
        
        try{
            const localToken=localStorage.getItem('token') 
            console.log('eacdsvfcdz')
            const response = await axios({
                method: 'get',
                url: 'http://localhost:5000/api/users',
                data: {
                    
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localToken}` 

                } 
            })
            return response.data
        }catch(e){
            console.log(e)
        }
    }
}
