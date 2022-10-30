import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1 - Testa o componente App.js', () => {
  test('Verifica se o topo da aplicação contém um menu fixo de navegação', () => {
    renderWithRouter(<App />);

    const homeMenu = screen.getByRole('link', { name: 'Home' });
    const aboutMenu = screen.getByRole('link', { name: 'About' });
    const favoriteMenu = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(homeMenu).toBeInTheDocument();
    expect(aboutMenu).toBeInTheDocument();
    expect(favoriteMenu).toBeInTheDocument();
  });

  test('Verifica se a página principal da pokedex é renderizada na URL /', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(title).toBeInTheDocument();
  });

  test('Verifica se é redirecionado a URL / ao clicar no menu Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });

    userEvent.click(home);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/');
  });

  test('Verifica se é redirecionado a URL /about ao clicar no menu About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    userEvent.click(aboutLink);

    const {
      location: { pathname },
    } = history;

    expect(pathname).toBe('/about');
  });

  test('Verifica se é redirecionado a URL /favorites ao clicar no menu Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(favorite);

    const {
      location: { pathname },
    } = history;

    expect(pathname).toBe('/favorites');
  });

  test('Verifica se é redirecionado a pagina NotFound caso url nao exista', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/404');

    const errorPage = screen.getByText(/Page requested not found/i);
    expect(errorPage).toBeInTheDocument();
  });
});
