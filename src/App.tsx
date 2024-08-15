import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import routes from './config/routes';


function App() {

  return (

    <HashRouter>
      {/* Navbar goes here */}
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
    </HashRouter>
  )
}

export default App
