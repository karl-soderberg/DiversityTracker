import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from 'src/App';

vi.mock('src/pages/ChartPage', () => ({
  ChartPage: ({ className }) => <div className={className}>Mocked Chart Page</div>
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});