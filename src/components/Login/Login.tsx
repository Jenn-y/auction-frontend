import { useState } from 'react'
import { toast } from 'react-toastify';

import AuthService from 'services/AuthService';
import { validateLoginData } from 'utils/Validations';

import './Login.scss';
import '../common_style/Form.scss'
import { LoginError } from 'interfaces/LoginError';

const Login = () => {
	const [user, setUser] = useState({ email: '', password: '' })
	const [errors, setErrors] = useState<LoginError>()

	const handleChange = (e: any) => {
		setUser(Object.assign({}, user, { [e.target.name]: e.target.value }))
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();

		setErrors(validateLoginData(user))
		setTimeout(
			() => handleLogin(), 
			300
		);
	}

	const handleLogin = () => {
		if (errors?.isError) {
			AuthService.login(
				user.email,
				user.password
			).then(
				() => {
					toast.success("Login sucessful!", { hideProgressBar: true });
					window.location.replace("/")
				}
			)
				.catch(() => {
					toast.error("Wrong email or password!", { hideProgressBar: true });
				});
		}

	};

	return (
		<div className="form">
			<div className="title">LOGIN</div>
			<form onSubmit={handleSubmit}>
				<div className="input_wrap">
					<label>Email</label>
					<div className="input_field">
						<input onChange={handleChange} value={user.email} name="email" type="text" className="input" placeholder="Enter your email" />
						<span>{errors?.email}</span>
					</div>
				</div>
				<div className="input_wrap">
					<label>Password</label>
					<div className="input_field">
						<input onChange={handleChange} value={user.password} name="password" type="password" className="input" placeholder="Enter your password" />
						<span>{errors?.password}</span>
					</div>
				</div>
				<div className="input_wrap remember-box">
					<input type="checkbox" name="remember_me" />
					<label htmlFor="remember_me">Remember me</label>
				</div>
				<div className="input_wrap">
					<input type="submit" id="login_btn" className="btn btn-lg" value="Login" />
				</div>
			</form>
		</div>
	);
}

export default Login;
