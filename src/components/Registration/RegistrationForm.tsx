import { Link } from "react-router-dom"

import './Registration.scss';
import '../common_style/Form.scss'

const RegistrationForm = () => {
	return (
		<div className="form">
			<div className="title">REGISTER</div>
			<form method="post">
				<div className="input_wrap">
					<label>First Name</label>
					<div className="input_field">
						<input type="text" className="input" id="input_text" placeholder="Enter your email" />
					</div>
				</div>
				<div className="input_wrap">
					<label>Last Name</label>
					<div className="input_field">
						<input type="text" className="input" id="input_text" placeholder="Enter your email" />
					</div>
				</div>
				<div className="input_wrap">
					<label>Email</label>
					<div className="input_field">
						<input type="text" className="input" id="input_text" placeholder="Enter your email" />
					</div>
				</div>
				<div className="input_wrap">
					<label>Password</label>
					<div className="input_field">
						<input type="password" className="input" id="input_password" placeholder="Enter your password" />
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

export default RegistrationForm;
