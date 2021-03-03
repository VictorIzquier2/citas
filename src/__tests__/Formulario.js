import React from 'react';
import {render, screen} from '@testing-library/react';
import Formulario from '../components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const crearCita = jest.fn();

test('<Formulario /> Cargar el formulario y revisar que todo sea correcto.', () => {
  //const wrapper = render(<Formulario/>);
  //wrapper.debug();

  render(<Formulario crearCita={crearCita} />);
  expect(screen.getByText('Crear Cita')).toBeInTheDocument();
  
  // Heading
  const titulo = screen.getByTestId('titulo');
  expect(titulo.textContent).toBe('Crear Cita');
  expect(titulo.tagName).not.toBe('H1');
  expect(titulo.tagName).toBe('H2');

  // Botón de submit
  const boton = screen.getByTestId('btn-submit');
  expect(boton.tagName).toBe('BUTTON');
  expect(boton.textContent).toBe('Pedir Cita');

});

test('<Formulario/> Validación de formulario', () => {
  render(
    <Formulario
      crearCita={crearCita}
    />);

    // Click en el boton de submit
    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);

    // Revisar por la alerta
    const alerta = screen.getByTestId('alerta')
    expect(alerta).toBeInTheDocument();
    expect(alerta.tagName).toBe('P');
    expect(alerta.textContent).toBe('Todos los campos son obligatorios');
});

test('<Formulario /> Validación de formulario', () => {
  render(
    <Formulario
      crearCita={crearCita}
    />
  );

  userEvent.type(screen.getByTestId('mascota'), 'Robin')
  userEvent.type(screen.getByTestId('propietario'), 'Victor');
  userEvent.type(screen.getByTestId('fecha'), '2021-09-10');
  userEvent.type(screen.getByTestId('hora'), '10:30');
  userEvent.type(screen.getByTestId('sintomas'), 'Amor');

  // Click en el botón de submit
  const btnSubmit = screen.getByTestId('btn-submit');
  userEvent.click(btnSubmit);
  
  // Revisar que no se produzca ninguna alerta 
  const alerta = screen.queryByTestId('alerta');
  expect(alerta).not.toBeInTheDocument();

  // Crear cita y comprobar que la función se haya llamado 
  expect(crearCita).toHaveBeenCalled();
  expect(crearCita).toHaveBeenCalledTimes(1);

});