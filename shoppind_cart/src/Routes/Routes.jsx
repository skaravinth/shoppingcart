import Drawer from '../Components/Drawer/Drawer';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Topbar from '../Components/Topbar/Topbar';
import Searchpage from '../Components/SerachPage/Searchpage';
import './Applayout.css'; // Import CSS for layout
import Cartpage from '../Pages/CartPage/Cartpage'
import ItemSelection from '../Components/Items/Items'

const Applayout = () => {
  return (
    <Router>
      <div className="layout-container">
        <Topbar />
        <div className="layout-content">
          <Drawer />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Cartpage />} />
              <Route path="/item/:id" element={<ItemSelection />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Applayout;
