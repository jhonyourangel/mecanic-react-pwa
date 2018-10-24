import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';

configure({ adapter: new Adapter()})

describe('<NavigationItems />', ()=>{
    const props = {
        isAuthenticated: false
    }
    describe('is not authenticated', () => {
        const wrapper = shallow(<NavigationItems {...props}> </NavigationItems>)
        it('should render 2 links', ()=> {
            expect(wrapper.children()).toHaveLength(2)
        })

        it('should render / and auth links', ()=> {           
            expect(wrapper.children().at(0).prop('link')).toBe('/')
            expect(wrapper.children().at(1).prop('link')).toBe('/auth')
        })
    })

    describe('is authenticated', () => {
        props.isAuthenticated = true
        const wrapper = shallow(<NavigationItems {...props}> </NavigationItems>)
        
        it('should render 5 links', ()=> {            
            expect(wrapper.find('NavigationItem')).toHaveLength(4)
        })

        it('should render / and auth links', ()=> {           
            expect(wrapper.find('NavigationItem').at(0).prop('link')).toBe('/')
            expect(wrapper.find('NavigationItem').at(1).prop('link')).toBe('/vehicles')
            expect(wrapper.find('NavigationItem').at(2).prop('link')).toBe('/maintenances')
            expect(wrapper.find('NavigationItem').at(3).prop('link')).toBe('/logout')
        })
    })
})
