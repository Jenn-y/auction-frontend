/**
 * @jest-environment node
 */
 import { shallow } from 'enzyme';
 import toJson from 'enzyme-to-json';

import Registration from 'components/Registration/Registration';

describe('Test case for testing registration', () => {
	let wrapper;
	test('email check', () => {
		wrapper = shallow(<Registration />);
		wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'johndoe@gmail.com' } });
		expect(toJson(wrapper.state('email'))).toEqual('johndoe@gmail.com');
	})

	it('first name check', () => {
		wrapper = shallow(<Registration />);
		wrapper.find('input[type="text"]').simulate('change', { target: { name: 'firstName', value: 'John' } });
		expect(toJson(wrapper.state('firstName'))).toEqual('John');
	})

	it('last name check', () => {
		wrapper = shallow(<Registration />);
		wrapper.find('input[type="text"]').simulate('change', { target: { name: 'lastName', value: 'Doe' } });
		expect(toJson(wrapper.state('lastName'))).toEqual('Doe');
	})

	it('password check', () => {
		wrapper = shallow(<Registration />);
		wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: '123456' } });
		expect(toJson(wrapper.state('password'))).toEqual('123456');
	})

	it('registration form check', () => {
		wrapper = shallow(<Registration />);
		wrapper.find('input[type="text"]').simulate('change', { target: { name: 'firstName', value: 'james' } });
		wrapper.find('input[type="text"]').simulate('change', { target: { name: 'lastName', value: 'bond' } });
		wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'jamesbond@gmail.com' } });
		wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: '123456' } });
		wrapper.find('input[type="submit"]').simulate('click');
	})
})
