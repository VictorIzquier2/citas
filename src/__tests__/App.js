import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

test('La aplicación funciona', () => {
  render(<App />);

  expect(screen.getByText('Administrador de pacientes')).toBeInTheDocument();
  expect(screen.getByTestId('nombreApp').textContent).toBe('Administrador de pacientes');
  expect(screen.getByTestId('nombreApp').tagName).toBe('H1');

  expect(screen.getByText('Solicita una cita')).toBeInTheDocument();

});

test('<App /> Agregar una cita y verificar el Heading', () => {

  render(<App />);

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

  // Revisar el título dinámico
  expect(screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus citas');

});

test('<App /> Verificar las citas en el DOM', async () => {
  render(<App />);

  const citas = await screen.findAllByTestId('cita');

  // Snapshot crea un archivo para verificar su contenido
  //expect(citas).toMatchSnapshot();

  expect(screen.getByTestId('btn-eliminar').tagName).toBe('BUTTON');

});