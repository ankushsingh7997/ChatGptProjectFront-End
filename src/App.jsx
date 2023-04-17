import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './components/homepage/Homepage'
import Mainpage from "./components/mainpage/Mainpage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Mainpage",
    element: <Mainpage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
