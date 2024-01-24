//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
//import {useState} from 'react'  
import { PrimeReactProvider } from 'primereact/api';


import "./App.scss"
import Rotas from "./Routes/routes";
import { Casket } from "./Shared/Casket/Casket";




function App() {

  return (
    <PrimeReactProvider>

      <div style={{ height: '100vh' }}>
        <Rotas></Rotas>
      </div>

    </PrimeReactProvider>

  );
}

export default App;
