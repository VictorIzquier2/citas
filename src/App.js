import React, {Fragment, useState, useEffect} from 'react';
import './assets/css/App.css';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en el local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }
  // Array de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use Effect para detectar cambios en el state cambia
  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales])

  // Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
    console.log(cita);
  }

  // Funcion que elimina una cita por su ID 
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }


  // Mensaje condicional
  const titulo = citas.length === 0 ? 'Solicita una cita' : 'Administra tus citas';
  
  return (
    <Fragment>
      <h1 data-testid='nombreApp'>Administrador de pacientes</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            <h2 data-testid='titulo-dinamico'>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />  
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
