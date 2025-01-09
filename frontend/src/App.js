import { BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './component/context/CartContext';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';



function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <Navbar/>
        <Routes>
          
        </Routes>
      <Footer/>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;
