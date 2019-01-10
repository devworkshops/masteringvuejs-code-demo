import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import AddressForm from '@/components/AddressForm.vue'
import Counter from '@/components/Counter.vue'
import App from '@/App.vue'

describe('App.vue', () => {
    it('footer should show current year', () => {
        const year = new Date().getFullYear()
        const wrapper = mount(App)
        expect(wrapper.find('.footer').text()).toMatch(JSON.stringify(year))
    })
})

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'Hello World'
        const wrapper = shallowMount(HelloWorld, {
            propsData: { msg }
        })
        expect(wrapper.text()).toMatch(msg)
    })
})

describe('AddressForm.vue', () => {
    it('it should fail if no address is provided', () => {
        expect(() => {
            shallowMount(AddressForm)
        }).toThrow()
    })

    it('address form is populated with provided address', () => {
        var address = {
            street: 'Brisbane st.',
            city: 'Brisbane',
            region: 'Queensland',
            postalCode: '4000',
            country: 'Australia',
            phone: '+61 7 3333 5555'
        }
        const wrapper = mount(AddressForm, { propsData: { address } })

        expect(wrapper.find('input#streetField').element.value).toMatch(
            address.street
        )
        expect(wrapper.find('input#cityField').element.value).toMatch(
            address.city
        )
        expect(wrapper.find('input#regionField').element.value).toMatch(
            address.region
        )
        expect(wrapper.find('input#postalCodeField').element.value).toMatch(
            address.postalCode
        )
        expect(wrapper.find('input#countryField').element.value).toMatch(
            address.country
        )
        expect(wrapper.find('input#phoneField').element.value).toMatch(
            address.phone
        )
    })
})

describe('Counter.vue', () => {
    it('increments when clicking on plus button', () => {
        const wrapper = shallowMount(Counter)
        expect(wrapper.vm.counter).toBe(0)
        wrapper.find('button').trigger('click')
        expect(wrapper.vm.counter).toBe(1)
    })
})
