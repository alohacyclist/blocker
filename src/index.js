import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from './App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, NotFound, Profile, Watchlist } from "./pages"
import { CryptoContextProvider } from './context/cryptoContext';
import { Watchlists } from "./components";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
      <Router>
        <CryptoContextProvider>
          <Routes>
            <Route path='/' element={<App />} >
            <Route  index element={<Home />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/user/watchlist' element={<Watchlist />} />
            <Route path='/watchlist' element={<Watchlists />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </CryptoContextProvider>  
    </Router>
  </StrictMode>,
  rootElement
);
