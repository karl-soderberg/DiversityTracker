import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import App from 'src/App';

vi.mock('src/pages/ChartPage', () => ({
  ChartPage: ({ className }) => <div className={className}>Chart Page</div>
}));

vi.mock('src/pages/FormPage', () => ({
  FormPage: ({ className }) => <div className={className}>Form Page</div>
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    // Arrange & Act
    const { container } = render(<App />);

    // Assert
    expect(container).toBeTruthy();
  });

  it('contains the navigation bar', () => {
    // Arrange
    const { container } = render(<App />);

    // Act
    const navbar = container.querySelector('.navbottom-container');

    // Assert
    expect(navbar).toBeTruthy();
  });

  it('changes state to ChartPage when clicking the charts view anchor', async () => {
    // Arrange
    const { container } = render(<App />);
    const chartsAnchor = container.querySelector('.navbottom__item:first-child');

    // Act
    fireEvent.click(chartsAnchor);

    // Assert
    const chartPage = container.querySelector('.chartpage-container');
    expect(chartPage).toHaveClass('chartpage-container active');
  });

  it('changes state to FormPage when clicking the form anchor', async () => {
    // Arrange
    const { container } = render(<App />);
    const formAnchor = container.querySelector('.navbottom__item:nth-child(2)');

    // Act
    fireEvent.click(formAnchor);

    // Assert
    const formPage = container.querySelector('.formpage-container');
    expect(formPage).toHaveClass('formpage-container active');
  });
});