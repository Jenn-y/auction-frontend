import './Login.scss';
import '../common_style/Form.scss'

const LoginForm = () => {
	return (
		<div className="form">
			<div className="title">LOGIN</div>
			<form method="post">
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

export default LoginForm;
