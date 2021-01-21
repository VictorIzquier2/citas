import React, {Fragment} from 'react';
import '../assets/css/index.css';
import PropTypes from 'prop-types';

const Cita = ({cita, eliminarCita}) => {

  const {id, mascota, propietario, fecha, hora, sintomas} = cita;

  return(
    <Fragment>
      <br/>  
      <div className='cita'>
        <p>Mascota:<span>{mascota}</span></p>
        <p>Propietario: <span>{propietario}</span></p>
        <p>Fecha: <span>{fecha}</span></p>
        <p>Hora: <span>{hora}</span></p>
        <p>Síntomas: <span>{sintomas}</span></p>
        <button
          className='button eliminar u-full-width'
          onClick={() => eliminarCita(id)}
        >Eliminar &times;</button>
      </div>
    </Fragment>
  )
};
Cita.propTypes = {
  Cita: PropTypes.object,
  eliminarCita: PropTypes.func.isRequired
}
export default Cita;