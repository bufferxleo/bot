
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import VisitLink from './components/VisitLink';
// App component to handle routing
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/visit-link" element={<VisitLink />} />
            </Routes>
        </Router>
    );
};

export default App;
