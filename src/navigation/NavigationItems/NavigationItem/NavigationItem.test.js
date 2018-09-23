import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItem from './NavigationItem'

configure({ adapter: new Adapter()})

describe('<NavigationItem /> ', ()=>{
    const props = {
        link: '/',
        exact: true
    }
    const wrapper = shallow(<NavigationItem {...props}>Home</NavigationItem>)

    it('should not be undefined', ()=> {
        expect(wrapper).not.toBeUndefined()
    })

    it('should contain just 1 <NavLink /> children', ()=> {       
        expect(wrapper.children()).toHaveLength(1)
    })

    it('should <NavLink /> be "exact" === "true"', ()=> {             
        expect(wrapper.children().at(0).prop('exact')).toBe(true)
    })

})