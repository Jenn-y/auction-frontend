/**
 * @jest-environment node
 */

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Login from './../components/Login/Login';
import AuthService from 'services/AuthService';

describe('Test case for testing login', () => {
	let wrapper;
	test('email check', () => {
		wrapper = shallow(<Login />);
		wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'johndoe@gmail.com' } });
		expect(toJson(wrapper.state('email'))).toEqual('johndoe@gmail.com');
	})

	it('password check', () => {
		wrapper = shallow(<Login />);
		wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: '123456' } });
		expect(toJson(wrapper.state('password'))).toEqual('123456');
	})

	it('login check', async () => {
		wrapper = shallow(<Login />);
		wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'jamesbond@gmail.com' } });
		wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: '123456' } });
		wrapper.find('input[type="submit"]').simulate('click');
		const response = await AuthService.login("jamesbond@gmail.com", "123456");
		expect("Bearer").toEqual(response.type);
	})
})
