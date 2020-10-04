import React from 'react';
import { shallow } from 'enzyme';
import { FormComponent } from './Form';

describe('Component Form', () => {
  it('should render without crashing', () => {
    const component = shallow(<FormComponent />);
    expect(component).toBeTruthy();
  });
});
