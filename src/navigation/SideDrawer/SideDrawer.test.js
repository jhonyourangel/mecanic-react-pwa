import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SideDrawer from './SideDrawer'

configure({adapter: new Adapter()})

describe('<SideDrawer />', ()=>{
    const wrapper = shallow(<SideDrawer />)

    it('should have a backdrop', () => {
        expect(wrapper.find('Backdrop')).not.toBeUndefined()
        expect(wrapper.find('Backdrop')).toHaveLength(1)
    })
    
    it('should have a logo', () => {
        expect(wrapper.find('Logo')).not.toBeUndefined()
        expect(wrapper.find('Logo')).toHaveLength(1)
    })

    it('should have a NavigationItems', () => {
        expect(wrapper.find('NavigationItems')).not.toBeUndefined()
        expect(wrapper.find('NavigationItems')).toHaveLength(1)
    })

})
