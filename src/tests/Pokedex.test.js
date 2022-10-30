import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 5 - Testa o componente Pokedex.js', () => {
  test('Verifica se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Encountered pokémons/i);
  });

  test('Verifica se o próximo Pokémon aparece ao clicar no botão Próximo pokémon', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByText(/Próximo Pokémon/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnFilter = screen.getByText(/All/i);

    expect(btnFilter).toBeInTheDocument();
    userEvent.click(btnFilter);
  });

  test('Verifica se é criado um botão de filtro para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);

    const btnPokemonType = screen.getAllByTestId('pokemon-type-button');
    const qtdpokemonTypes = 7;

    const allButton = screen.getByRole('button', { name: 'All' });
    const fire = screen.getByRole('button', { name: 'Fire' });
    const electric = screen.getByRole('button', { name: 'Electric' });
    const poison = screen.getByRole('button', { name: 'Poison' });
    const dragon = screen.getByRole('button', { name: 'Dragon' });
    const normal = screen.getByRole('button', { name: 'Normal' });
    const psychic = screen.getByRole('button', { name: 'Psychic' });
    const bug = screen.getByRole('button', { name: 'Bug' });

    expect(btnPokemonType).toHaveLength(qtdpokemonTypes);
    expect(allButton).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
  });
});
