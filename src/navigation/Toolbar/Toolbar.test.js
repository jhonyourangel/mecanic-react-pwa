import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Toolbar } from './Toolbar'

configure({adapter: new Adapter()})

describe('<Toolbar />', ()=>{
    const props = {
        loading: true,
    }
    const wrapper = shallow(<Toolbar {...props}/>)

    it('should have a DrawerToggle', () => {
        expect(wrapper.find('DrawerToggle')).not.toBeUndefined()
        expect(wrapper.find('DrawerToggle')).toHaveLength(1)
    })

    it('should have title "Auto SOFPET"', () => {
        expect(wrapper.find('h2')).not.toBeUndefined()
        expect(wrapper.find('h2')).toHaveLength(1)
        expect(wrapper.find('h2').text()).toBe('Auto SOFPET (alpha)')
    })

    it('should show the loading bar if loading is true', () => {
        expect(wrapper.find('div.Loading')).not.toBeUndefined()
        expect(wrapper.find('div.Loading')).toHaveLength(1)
    })

    it('should NOT show the loading bar if loading is false', () => {
        wrapper.setProps({loading: false})
        expect(wrapper.find('div.Loading')).toHaveLength(0)
    })
})
