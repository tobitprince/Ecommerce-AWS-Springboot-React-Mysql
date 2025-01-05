import axios from "axios"

export default class ApiService{

    static BASE_URL = "http://localhost:2424";
    static getHeader(){
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /*AUTH and User API*/
    static async registerUser(registration){
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;

    }
    static async loginUser(loginDetails){
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data;
    }


    static async getLoggedInUserInfo(){
        const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
            headers: this.getHeader()
        })
        return response.data
    }
}