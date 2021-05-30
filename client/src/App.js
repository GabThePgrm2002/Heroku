import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState';
import Pages from './components/mainpages/Pages';
import Header from './components/headers/Header';
import './index.css';
import HashLoader from "react-spinners/HashLoader";
import Footer from './components/mainpages/utils/footer/Footer'


function App() {

  const [loading, setLoading] = useState(false);
  //const [color, setColor] = useState("#157A3F");
  const [color, setColor] = useState();

  useEffect(() => {
    setColor("#FFFFFF");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, [])
  
  return (
        <DataProvider>
      <Router>
      <div className="App">

        {
          loading ? 
          <div className="container center-block-loading">
            <div className="loader">
            <h1 className="page-title-loading">ArvaZon...</h1>
            </div>
          <HashLoader color={color} loading={loading} size={150} /> 
          </div> :
        <div>
             <Header />
          <Pages />
          <Footer />
        </div>
      }

      </div>
      </Router>
    </DataProvider>
    
    
  );
}

export default App;
