import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './componenets/Signup';
import Signin from './componenets/Signin';
import Homepage from './componenets/Homepage';
import HomeFarmer from './componenets/HomeFarmer';
import UploadProduct from './componenets/UploadProducts';
import ProductsList from './componenets/ProductList';
import ProductDetails from './componenets/ProductDetails';
import HomeCustomer from './componenets/HomeCustomer';
import OrderForm from './componenets/OrderForm';
import MyOrders from './componenets/MyOrders';
import FarmerOrder from './componenets/FarmerOrder';
import UpdateProducts from './componenets/UpdateProducts';
import UpdateForm from './componenets/UpdateForm';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/homepage' element={<HomeFarmer />} />
          <Route path="/upload-product" element={<UploadProduct />} />
          <Route path="/product" element={<ProductsList />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/home' element={<HomeCustomer />} />
          <Route path='/products' element={<ProductsList />} />
          <Route path="/order/:id" element={<OrderForm />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/farmerOrder' element={<FarmerOrder />} />
          <Route path="/update-products" element={<UpdateProducts />} />
          <Route path='/update-form/:id' element={<UpdateForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
