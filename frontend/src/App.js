import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './component/context/CartContext';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import Home from './component/pages/Home';
import ProductDetailsPage from './component/pages/ProductsDetailsPage';
import CategoryListPage from './component/pages/CategoryListPage';
import CategoryProductsPage from './component/pages/CategoryProductsPage';
import CartPage from './component/pages/CartPage';
import RegisterPage from './component/pages/RegisterPage';
import LoginPage from './component/pages/LoginPage';
import ProfilePage from './component/pages/ProfilePage';
import AddressPage from './component/pages/AddressPage';
import { ProtectedRoute } from './service/Guard';



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
          <Route exact path='/cart' element={<CartPage/>}/>
          <Route exact path='/register' element={<RegisterPage/>}/>
          <Route exact path='/login' element={<LoginPage/>}/>

          <Route exact path='/profile' element={<ProtectedRoute element={<ProfilePage/>}/>}/>
          <Route exact path='/add-address' element={<ProtectedRoute element={<AddressPage/>}/>}/>
          <Route exact path='/edit-address' element={<ProtectedRoute element={<AddressPage/>}/>}/>
        </Routes>
      <Footer/>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;
