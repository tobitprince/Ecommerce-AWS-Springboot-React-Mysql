import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './component/context/CartContext';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import Home from './component/pages/Home';
import ProductDetailsPage from './component/pages/ProductsDetailsPage';
import CategoryListPage from './component/pages/CategoryListPage';
import CategoryProductsPage from './component/pages/CategoryProductsPage';



function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={< Home/>}/>
          <Route exact path='/product/:productId' element={<ProductDetailsPage/>}/>
          <Route exact path='/categories' element={<CategoryListPage/>}/>
          <Route exact path='/category/:categoryId' element={<CategoryProductsPage/>}/>
        </Routes>
      <Footer/>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;
