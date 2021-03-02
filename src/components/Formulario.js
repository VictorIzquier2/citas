import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

  // Crear State de Citas
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });

  const [error, actualizarError] = useState(false)
  
  // Función que se ejecuta cada vez que el usuario escribe en un input
  const handleChange = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

  // Extraer los valores
  const {mascota, propietario, fecha, hora, sintomas} = cita;

  // Enviar Formulario
  const submitCita = (e) => {
    e.preventDefault();

    // Validar los datos del formulario
    if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim === '' || hora.trim === '' || sintomas.trim === ''){
      actualizarError(true);
      return;
    }
    //Eliminar el mensaje previo
    actualizarError(false);

    // Asignar un ID
    cita.id = uuidv4();

    // Crear la cita
    crearCita(cita);

    // Reiniciar el formulario al enviar la cita
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })


  }

  return ( 
    <Fragment>
      <h2 data-testid='titulo'>Crear Cita</h2>
      {error ? <p data-testid='alerta' className='alerta-error'>Todos los campos son obligatorios</p> : null}
      <form
        onSubmit={submitCita}
      >
        <label>Nombre Mascota</label>
        <input
          data-testid='mascota'
          type='text'
          name='mascota'
          className='u-full-width'
          placeholder='Nombre Mascota'
          onChange={handleChange}
          value={mascota}
        />
        <label>Propietario</label>
        <input
          data-testid='propietario'
          type='text'
          name='propietario'
          className='u-full-width'
          placeholder='Nombre del propietario'
          onChange={handleChange}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          data-testid='fecha'
          type='date'
          name='fecha'
          className='u-full-width'
          onChange={handleChange}
          value={fecha}
        />
        <label>Hora</label>
        <input
          data-testid='hora'
          type='time'
          name='hora'
          className='u-full-width'
          onChange={handleChange}
          value={hora}
        />
        <label>Síntomas</label>
        <textarea
          data-testid='sintomas'
          className='u-full-width'
          name='sintomas'
          onChange={handleChange}
          value={sintomas}
        ></textarea>
        <button
          data-testid='btn-submit'
          type='submit'
          className='u-full-width button-primary'
        >Pedir Cita</button>
      </form>
    </Fragment>
   );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}
 
export default Formulario;