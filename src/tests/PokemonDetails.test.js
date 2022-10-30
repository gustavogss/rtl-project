import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 7 - Testa o componente PokemonDetails.js', () => {
  test('Verifica mais detalhes do Pokemon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more details/i));

    const namePokemon = screen.getByText(/Pikachu Details/i);
    const summary = screen.getByText(/summary/i);
    const description = screen.getByText(/This intelligent Pokémon roasts hard berries/i);

    expect(namePokemon).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
  });
  test('Verifica as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);
    const heading = screen.getByText(/Game Locations of Pikachu/i);
    expect(heading).toBeInTheDocument();
    const imagePokemon = screen.getAllByAltText('Pikachu location');

    expect(imagePokemon.length).toBeGreaterThan(0);
    expect(imagePokemon[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imagePokemon[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('Verifica se o usuário pode favoritar um pokémon pela página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);
    const favoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(favoritePokemon).toBeInTheDocument();
    const checkPokemon = screen.getByRole('checkbox');
    expect(checkPokemon).toBeInTheDocument();
    userEvent.click(checkPokemon);
    expect(checkPokemon).toBeChecked();
    userEvent.click(checkPokemon);
    expect(checkPokemon).not.toBeChecked();
  });
});
