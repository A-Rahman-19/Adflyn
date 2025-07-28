import { Routes, Route } from 'react-router-dom';
import Home from './component/home';
import Waitlist from './component/waitlists';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/waitlists" element={<Waitlist />} />
    </Routes>
  );
}

export default AppRoutes;