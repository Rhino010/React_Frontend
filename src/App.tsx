import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import routes from './config/routes';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux'
import { store } from './redux/slices/store'


function App() {

  return (

    <BrowserRouter>
      <Navbar />
      <Provider store = {store}>
        <Routes>
          {routes.map((route: any, index: any) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.component />
              }
            />
          ))}
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
