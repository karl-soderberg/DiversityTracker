import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import App from 'src/App';

vi.mock('src/pages/ChartPage', () => ({
  ChartPage: ({ className }) => <div className={className}>Mocked Chart Page</div>
}));

vi.mock('src/pages/FormPage', () => ({
  FormPage: ({ className }) => <div className={className}>Mocked Form Page</div>
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('contains navigation bar', () => {
    const { container } = render(<App />);
    const navbar = container.querySelector('.navbottom-container');
    expect(navbar).toBeTruthy();
  });
});