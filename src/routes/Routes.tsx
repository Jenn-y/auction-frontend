import { Route, Switch } from "react-router-dom";

import About from 'pages/about/About';
import Terms_Conditions from 'pages/terms_conditions/Terms_Conditions';
import Privacy_Policy from 'pages/privacy_policy/Privacy_Policy';
import ScrollToTop from "utils/ScrollToTop";
import SingleProduct from "components/Product/SingleProduct";
import LandingPage from "pages/landing_page/LandingPage";

const Routes = () => {
	return (
		<>
			<ScrollToTop />
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/terms_conditions" component={Terms_Conditions} />
				<Route exact path="/about" component={About} />
				<Route exact path="/privacy_policy" component={Privacy_Policy} />
				<Route exact path="/auctions/:uuid" component={SingleProduct} />
			</Switch>
		</>
	);
};

export default Routes
