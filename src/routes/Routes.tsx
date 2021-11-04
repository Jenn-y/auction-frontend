import { Route, Switch } from "react-router-dom";

import About from 'pages/about/About';
import Terms_Conditions from 'pages/terms_conditions/Terms_Conditions';
import Privacy_Policy from 'pages/privacy_policy/Privacy_Policy';
import ScrollToTop from "utils/ScrollToTop";
import Login from "components/Login/Login";
import Registration from "components/Registration/Registration";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const Routes = () => {
	return (
		<>
			<ToastContainer />
			<ScrollToTop />
			<Switch>
				<Route exact path="/terms_conditions" component={Terms_Conditions} />
				<Route exact path="/about" component={About} />
				<Route exact path="/privacy_policy" component={Privacy_Policy} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Registration} />
			</Switch>
		</>
	);
};

export default Routes
