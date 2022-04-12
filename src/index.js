import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from './App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, NotFound, Profile } from "./pages"
import { CryptoContextProvider } from './context/cryptoContext';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
      <Router>
        <CryptoContextProvider>
          <Routes>
            <Route path='/' element={<App />} >
            <Route  index element={<Home />} />
            {/* <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} /> */}
            <Route path='/user/profile' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </CryptoContextProvider>  
    </Router>
  </StrictMode>,
  rootElement
);
