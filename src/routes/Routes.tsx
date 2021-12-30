import { Route, Switch } from "react-router-dom";

import About from 'pages/about/About';
import Terms_Conditions from 'pages/terms_conditions/Terms_Conditions';
import Privacy_Policy from 'pages/privacy_policy/Privacy_Policy';
import ScrollToTop from "utils/ScrollToTop";
import SingleProduct from "components/Product/SingleProduct";
import Login from "components/Login/Login";
import Registration from "components/Registration/Registration";
import LandingPage from "pages/landing_page/LandingPage";
import { ToastContainer } from "react-toastify";
import Shop from "components/Shop/Shop";

import 'react-toastify/dist/ReactToastify.css';
import Shop from "components/Shop/Shop";

const Routes = () => {
	return (
		<>
			<ToastContainer />
			<ScrollToTop />
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/terms_conditions" component={Terms_Conditions} />
				<Route exact path="/about" component={About} />
				<Route exact path="/privacy_policy" component={Privacy_Policy} />
				<Route exact path="/auctions/:id" component={SingleProduct} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Registration} />
				<Route exact path="/shop/:categoryId" component={Shop} />
			</Switch>
		</>
	);
};

export default Routes
