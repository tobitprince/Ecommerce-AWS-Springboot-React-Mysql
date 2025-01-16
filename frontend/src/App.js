import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './component/context/CartContext';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import Home from './component/pages/Home';



function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={< Home/>}/>
        </Routes>
      <Footer/>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;
