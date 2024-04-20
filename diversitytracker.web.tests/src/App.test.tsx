import { describe, it } from 'vitest';
import { expect } from 'vitest';
import { render } from '@testing-library/react';
import App from 'src/App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
  });
});