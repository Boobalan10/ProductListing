import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { RouterData } from './Router/Router';
import NavBar from './Components/NavBar/NavBar';
import { Provider } from 'react-redux';
import { store } from './Store/Store';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <section className='navSec container-fluid'>
            <NavBar />
          </section>
          <Routes>
            {RouterData.map((item) => (
              <Route
                key={item.id}
                name={item.name}
                path={item.path}
                element={<item.element />}
              />
            ))}
          </Routes>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
