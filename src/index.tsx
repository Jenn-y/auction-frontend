import React from 'react';
import ReactDOM from 'react-dom';
import 'index.scss';
import App from 'components/App/App';
import reportWebVitals from 'reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from 'pages/about/About';
import Terms_Conditions from 'pages/terms_conditions/Terms_Conditions';
import Privacy_Policy from 'pages/privacy_policy/Privacy_Policy';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route exact path="/terms_conditions" component={Terms_Conditions} />
				<Route exact path="/about" component={About} />
				<Route exact path="/privacy_policy" component={Privacy_Policy} />
				<Route exact path="/" component={App} />
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
