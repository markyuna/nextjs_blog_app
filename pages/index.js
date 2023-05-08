import React, { useEffect } from 'react';
import App from "./_app";
import Format from '../layout/format';

import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

// components
import Section1 from '../components/section1';
import Section2 from '../components/section2';
import Section3 from '../components/section3';
import Section4 from '../components/section4';

export default function Home() {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  }, []);

  return (
   <Format>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
   </Format>
  )
}
