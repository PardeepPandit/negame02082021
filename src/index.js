import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, } from "react-router-dom";
import CommonState from './component/MyComponent/context/common/CommonState'  
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


