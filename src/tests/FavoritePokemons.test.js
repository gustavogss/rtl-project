import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 3 - Testa o componente FavoritePokemons.js', () => {
  test('Verifica a mensagem "No favorite pokemon found" quando não há favoritos', () => {
    render(<FavoritePokemons />);
    const noFavoritePokemon = screen.getByText(/No favorite pokemon found/i);

    expect(noFavoritePokemon).toBeInTheDocument();
  });

  test('Verifica se são exibidos todos os cards de pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/65');
    const favoriteAlakazam = screen.getByRole('checkbox');
    expect(favoriteAlakazam).toBeInTheDocument();
    userEvent.click(favoriteAlakazam);
    expect(favoriteAlakazam.checked).toEqual(true);

    history.push('/pokemons/148');
    const favoriteDragonair = screen.getByRole('checkbox');
    expect(favoriteDragonair).toBeInTheDocument();
    userEvent.click(favoriteDragonair);
    expect(favoriteDragonair.checked).toEqual(true);

    history.push('/favorites');
    const Alakazam = screen.getByText(/Alakazam/i);
    const Dragonair = screen.getByText(/Dragonair/i);
    expect(Alakazam).toBeInTheDocument();
    expect(Dragonair).toBeInTheDocument();
  });

  test('Verifica que nenhum card é exibido, quando ele não estiver favoritado', () => {
    render(<FavoritePokemons />);
    const pikachu = screen.queryByText(/Pikachu/i);
    expect(pikachu).not.toBeInTheDocument();
  });
});
