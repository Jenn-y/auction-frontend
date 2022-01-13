import { useState } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import AuthService from 'services/AuthService';
import { isValidRegisterInput, validateRegisterData } from 'utils/Validations';
import { EMAIL_UNAVAILABLE } from 'constants/ErrorMessages';

import './../common_style/Form.scss'
import './Registration.scss'
import { RegistrationError } from 'interfaces/RegistrationError';

const Registration = () => {

	const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '' })
	const [errors, setErrors] = useState<RegistrationError>({ firstName: '', lastName: '', email: '', password: '', isError: true })

	const handleChange = (e: any) => {
		setUser(Object.assign({}, user, { [e.target.name]: e.target.value }))
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();

		setErrors(validateRegisterData(user))
		handleRegistration() 
	}

	const handleRegistration = () => {
		if (isValidRegisterInput(user)) {
			AuthService.register(
				user.firstName,
				user.lastName,
				user.email,
				user.password
			).then(
				response => {
					if (response.status) {
						toast.success(JSON.stringify(response.message), { hideProgressBar: true });
						window.location.replace("/login")
					} else {
						toast.error(JSON.stringify(response.message), { hideProgressBar: true });
					}
				}
			)
		}
	};

	return (
		<div className="form">
			<div className="title">REGISTER</div>
			<form onSubmit={handleSubmit}>
				<div className="input_wrap">
					<label>First Name<span>*</span></label>
					<div className="input_field">
						<input onChange={handleChange} value={user.firstName} name="firstName" type="text" className="input" placeholder="Enter your first name" />
						<span>{errors?.firstName}</span>
					</div>
				</div>
				<div className="input_wrap">
					<label>Last Name<span>*</span></label>
					<div className="input_field">
						<input onChange={handleChange} value={user.lastName} name="lastName" type="text" className="input" placeholder="Enter your last name" />
						<span>{errors?.lastName}</span>
					</div>
				</div>
				<div className="input_wrap">
					<label>Email<span>*</span></label>
					<div className="input_field">
						<input onChange={handleChange} value={user.email} name="email" type="text" className="input" placeholder="Enter your email" />
						<span>{errors?.email}</span>
					</div>
				</div>
				<div className="input_wrap">
					<label>Password<span>*</span></label>
					<div className="input_field">
						<input onChange={handleChange} value={user.password} name="password" type="password" className="input" placeholder="Enter your password" />
						<span>{errors?.password}</span>
					</div>
				</div>
				<div className="input_wrap">
					<input type="submit" id="register_btn" className="btn btn-lg" value="Register" />
				</div>
				<div className="input_wrap">
					<p>Already have an account?<Link to="/login" className="login-link">Login</Link></p>
				</div>
			</form>
		</div>
	);
}

export default Registration;
