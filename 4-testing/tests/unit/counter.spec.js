import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter.vue', () => {
    it('increase when click', () => {
        const wrapper = shallowMount(Counter)
        expect(wrapper.vm.counter).toBe(0)
        wrapper.find('button').trigger('click')
        expect(wrapper.vm.counter).toBe(1)
        expect(wrapper.find('button').classes('positive')).toBeTruthy()
    })
    it('decrease when right-click', () => {
        const wrapper = shallowMount(Counter)
        expect(wrapper.vm.counter).toBe(0)
        wrapper.find('button').trigger('contextmenu')
        expect(wrapper.vm.counter).toBe(-1)
        expect(wrapper.find('button').classes('negative')).toBeTruthy()
    })
})
