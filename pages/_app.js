import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import "../styles/globals.css";
import Menu from "../components/Menu";
import Home from "./index";
import TechnoAdd from "./TechnoAdd";
import TechnoList from "./TechnoList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import SweetAlert from 'react-bootstrap-sweetalert';

function App() {
  const STORAGE_KEY = "technos";
  const [storedTechnos, setStoredTechnos] = useLocalStorage(STORAGE_KEY, []);
  const [technos, setTechnos] = useState(storedTechnos);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [technoToDeleteId, setTechnoToDeleteId] = useState(null);

  useEffect(() => {
    console.log("App component mounted");
  }, []);

  useEffect(() => {
    setStoredTechnos(technos);
    console.log("Technos changed");
  }, [technos, setStoredTechnos]);

  function handleAddTechno(newTechno) {
    const updatedTechnos = [...technos, { ...newTechno, technoid: uuidv4() }];
    setTechnos(updatedTechnos);
  }

  function handleDeleteTechno(id) {
    setTechnoToDeleteId(id);
    setShowDeleteAlert(true);
  }

  function handleDeleteConfirm() {
    const updatedTechnos = technos.filter((techno) => techno.technoid !== technoToDeleteId);
    setTechnos(updatedTechnos);
    setShowDeleteAlert(false);
  }

  function handleDeleteCancel() {
    setShowDeleteAlert(false);
  }

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/add"
          element={<TechnoAdd handleAddTechno={handleAddTechno} />}
        />
        <Route
          path="/list"
          element={
            <TechnoList
              technos={technos}
              handleDeleteTechno={handleDeleteTechno}
            />
          }
        />
      </Routes>
      {showDeleteAlert && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Eliminar"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="¿Estás seguro de eliminar este techno?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          focusCancelBtn
        >
          El techno seleccionado será eliminado permanentemente.
        </SweetAlert>
      )}
    </>
  );
}

export default App;
