import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from './App';
import { Home } from './Home';

describe('renders learn react link', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render Home component', function () {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(Home).exists()).toBeTruthy();
  });
});
