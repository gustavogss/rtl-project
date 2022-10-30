import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4 - Testa o componente NotFound.js', () => {
  test('Verifica se a página contém um h2 com "Page requested not found 😭"', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading', { level: 2 });
    const title = 'Page requested not found 😭';

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(title);
  });

  test('Verifica se a página mostra a imagem de uma URL', () => {
    render(<NotFound />);
    const image = screen.getAllByRole('img');

    expect(image[1].src).toContain(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
