import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Layout } from './Layout'

configure({adapter: new Adapter()})

describe('<Layout />', ()=>{
    const props = {showSideDrawer: false}
    const wrapper = shallow(<Layout {...props}/>)

    it('should have 4 children',() => {
        expect(wrapper.children()).toHaveLength(3)
    })

    describe(' sidedrawer is closed ', () =>{

        it('should have a Toolbar',() => {
            expect(wrapper.find('Toolbar')).not.toBeUndefined()
        })

        it('should have a SideDrawer',() => {
            expect(wrapper.find('SideDrawer')).not.toBeUndefined()
        })

        it('should have a main',() => {
            expect(wrapper.find('main')).not.toBeUndefined()
            expect(wrapper.find('main').hasClass('Content')).toBe(true)
        })

        it('should have a SyncBar',() => {
            expect(wrapper.find('SyncBar')).not.toBeUndefined()
        })
    })

    describe(' sidedrawer is open ', () =>{
        wrapper.setProps({showSideDrawer: true})

        it('should have a Backdrop',() => {
            expect(wrapper.find('Backdrop')).not.toBeUndefined()
        })
    })
})
