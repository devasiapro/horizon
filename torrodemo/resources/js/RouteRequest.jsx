import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {Guide} from './pages/Guide';

const RouteRequest = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route element={<RequireAuth />}>
          <Route path="/guide" element={<Guide />}></Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default RouteRequest;