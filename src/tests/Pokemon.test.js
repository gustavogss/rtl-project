import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Requisito 06 - Testa o componente Pokemon.js', () => {
  test('Verifica se é renderizado um card com as informações de um certo pokémon', () => {
    const {
      averageWeight: { value, measurementUnit },
    } = data[0];
    renderWithRouter(<App />);
    const namePokemon = screen.getByText(data[0].name);
    const typePokemon = screen.getAllByText(data[0].type)[0];
    const weigthPokemon = screen.getByText(
      `Average weight: ${value} ${measurementUnit}`,
    );

    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(weigthPokemon).toBeInTheDocument();

    const image = screen.getByRole('img', { name: `${data[0].name} sprite` });

    expect(image).toHaveAttribute('src', data[0].image);
    expect(image.alt).toContain(`${data[0].name} sprite`);
  });
  test('Verifica se há um link com mais detalhes do Pokemon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${data[0].id}`);
  });
  test('Verifica se ao clicar no link vai para a página com mais detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);

    expect(history.location.pathname).toBe(`/pokemons/${data[0].id}`);
  });
  test('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);

    expect(screen.getByTestId(/pokemon-type/i).innerHTML).toBe('Electric');
    userEvent.click(screen.getByRole('checkbox'));
    const imagePokemon = screen.getByRole('img', {
      name: `${data[0].name} is marked as favorite`,
    });

    expect(imagePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
