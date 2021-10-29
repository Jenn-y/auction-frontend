import { BrowserRouter as Router } from "react-router-dom";
import Routes from "routes/Routes";

import Footer from "shared/footer/Footer";
import Header from "shared/header/Header";

import './App.scss';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes />
                <Footer />
            </Router>
        </div>
    );
}

export default App;
