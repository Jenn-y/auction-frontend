import { BrowserRouter as Router } from "react-router-dom";

import Footer from "shared/footer/Footer";
import Header from "shared/header/Header";

import './App.scss';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <div className="main"></div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
