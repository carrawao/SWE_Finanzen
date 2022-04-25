import renderer from 'react-test-renderer';
import SearchField from '../SearchField';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <SearchField/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});