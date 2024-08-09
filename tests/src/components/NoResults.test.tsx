import {render, screen} from '@testing-library/react-native';
import {NoResults} from '../../../src/components/NoResults';

describe('NoResults', () => {
  it('contains correct text', async () => {
    render(<NoResults />);
    const view = await screen.findByTestId('noResults');
    expect(view).toHaveTextContent('No Results', {exact: false});
  });
});
