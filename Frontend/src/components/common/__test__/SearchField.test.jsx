import renderer from 'react-test-renderer';
import SearchField from '../SearchField';

it('Snapshot Test SearchField', () => {
  const component = renderer.create(
    <SearchField/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});