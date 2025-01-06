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

    // // // Product Endpoints
    static async addProduct(formDetails){
        const response = await axios.post(`${this.BASE_URL}/product/create`, formDetails, {
            headers: {
                ...this.getHeader(),
                "Content-Type":"multipart/formdata"
            }
        })
        return response.data
    }

    static async updateProduct(productId,formDetails){
        const response = await axios.put(`${this.BASE_URL}/product/update/${productId}`, formDetails,{
            headers: {
                ...this.getHeader(),
                "Content-Type":"multipart/form-data"
            }
        })
        return response.data
    }

    static async getAllProducts(){
        const response = await axios.get(`${this.BASE_URL}/product/get-all`)
        return response.data
    }

    static async searchProduct(searchValue){
        const response = await axios.get(`${this.BASE_URL}/product/search-product`, {
            params: {searchValue}
        })
        return response.data;
    }

    static async getProductsByCategoryId(categoryId){
        const response = await axios.get(`${this.BASE_URL}/product/get-products-by-category-id/${categoryId}`)
        return response.data
    }

    static async getProductById(productId){
        const response = await axios.get(`${this.BASE_URL}/product/get-product-by-id/${productId}`)
        return response.data
    }

    static async deleteProduct(productId){
        const response = await axios.delete(`${this.BASE_URL}/product/delete/${productId}`, {
            headers: this.getHeader()
        })
        return response.data
    }
}