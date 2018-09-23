import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DrawerToggle from './DrawerToggle';

configure({ adapter: new Adapter()})

describe('<DrawerToggle />', ()=> {
    const wrapper = shallow(<DrawerToggle />)

    it('should have 3 div children', () => {
        expect(wrapper.children()).toHaveLength(3)
    })
})
