import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../common/Pagination';
import ProductList from '../common/ProductList';
import ApiService from '../../service/ApiService';
import "../../style/home.css"

const Home = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 2;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let allProducts = [];
                const queryParams = new URLSearchParams(location.search);
                const searchItem = queryParams.get('search')

                if(searchItem){
                    const response = await ApiService.searchProduct(searchItem);
                    allProducts = response.productList || [];
                }else {
                    const response = await ApiService.getAllProducts();
                    allProducts = response.productList || [];
                }

                setTotalPages(Math.ceil(allProducts.length/itemsPerPage));
                setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'unable to fetch products')
            }
        }
        fetchProducts();
    }, [location.search, currentPage])


    return(
        <div className="home">
            {error? (
                <p className="error-message">{error}</p>
            ):(
                <div>
                    <ProductList products={products}/>
                    <Pagination currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}/>
                </div>
            )}
        </div>
    )
}

export default Home;