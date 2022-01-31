import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "routes/Routes";

import Footer from "shared/footer/Footer";
import Header from "shared/header/Header";

import './App.scss';

const stripePromise = loadStripe("pk_test_51KKK3gHfG2ohyeRD03CbsK95kB7FtNPGmkK1uRkLS4AjZeGAyD6WOnAJT6Qdi0IQSHyszLNMFfzkDRXV4R79B6BV008Svh4f1t");

const App = () => {
    return (
        <Elements stripe={stripePromise}>
            <div className="App">
                <Router>
                    <Header />
                    <Routes />
                    <Footer />
                </Router>
            </div>
        </Elements>
    );
}

export default App;
