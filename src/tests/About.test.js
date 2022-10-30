import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Requisito 2 - Testa o componente About.js', () => {
  test('Verifica se a página contém as informações sobre a "Pokédex"', () => {
    renderWithRouter(<About />);
    const about = screen.getByText('About Pokédex');

    expect(about).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    const p2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('Verifica se a página tem uma imagem de uma Pokedex', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
