import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import "../../style/home.css"
import ProductList from '../common/ProductList';
import Pagination from '../common/Pagination';

const CategoryProductsPage = ()=>{
    const {categoryId} = useParams();
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 2

    useEffect(() => {
        fetchProducts();
    }, [categoryId, currentPage]);

    const fetchProducts = async()=>{
        try {
            setLoading(true)
            const response = await ApiService.getProductsByCategoryId(categoryId)
            const allProducts = response.productList || [];
            console.log(allProducts)

            setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
            setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch Products by the Category Id')
            console.error('Error fetching products:', error)

        } finally {
            setLoading(false);
        }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="home">
            {error?(
                <div className="error-message">{error}</div>
            ):(
                <div>
                    <ProductList products={products}/>
                    <Pagination currentPage={currentPage}/>
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                </div>

            )}
        </div>
    )
}

export default CategoryProductsPage