import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faClose, faInfoCircle, faPrint } from '@fortawesome/free-solid-svg-icons';
import './Catlog.css';

const CatalogPage = ({ onItemClick }) => {
  const [items] = useState([
    { name: 'Chicken BBQ Pizza', category: 'Burger', variants: 2, image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg' },
    { name: 'French Fries Combo', category: 'Sandwich', variants: 2, image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg' },
    { name: 'Pan Pizza', category: 'Burger', variants: 2, image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg' },
    { name: 'Mushroom Sandwich', category: 'Sandwich', variants: 2, image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg' },
    { name: 'Watermelon Juice', category: 'Juice', variants: 2, image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg' },
    { name: 'Plain Nachos', category: 'Burger', variants: 2, image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg' },
    { name: 'Mexican Nachos', category: 'Burger', image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg' },
    { name: 'Grape Juice', category: 'Juice', variants: 2, image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg' },
    { name: 'Mango Juice', category: 'Juice', image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg' },
  ]);

  const [activeCategory, setActiveCategory] = useState('All');
  const filteredItems = activeCategory === 'All' ? items : items.filter(item => item.category === activeCategory);

  return (
    <div className="catalog-container" style={{ width: '480px' }}>
      <div className="catalog-header">
       Catalog
        <div className="header-icons" style={{ color: 'black' }}>
          <FontAwesomeIcon icon={faEllipsisVertical} style={{ height: '20px' }} />
          <FontAwesomeIcon icon={faClose} style={{ height: '20px', marginLeft: '20px' }} />
        </div>
      </div>

      <div className="category-filters">
        <button className={`button ${activeCategory === 'All' ? 'active' : ''}`} onClick={() => setActiveCategory('All')}>All</button>
        <button className={`button ${activeCategory === 'Favourites' ? 'active' : ''}`} onClick={() => setActiveCategory('Favourites')}>Favourites</button>
        <button className={`button ${activeCategory === 'Burger' ? 'active' : ''}`} onClick={() => setActiveCategory('Burger')}>Burger</button>
        <button className={`button ${activeCategory === 'Sandwich' ? 'active' : ''}`} onClick={() => setActiveCategory('Sandwich')}>Sandwich</button>
        <button className={`button ${activeCategory === 'Juice' ? 'active' : ''}`} onClick={() => setActiveCategory('Juice')}>Juice</button>
        
      </div>

      <div className="catalog-grid">
        {filteredItems.slice(0, 9).map((item, index) => (
          <div key={index} className="catalog-item" onClick={() => onItemClick(item)}>
            <div className="item-image">
              <img src={item.image} alt={item.name} />
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
            </div>
            <div className="item-details" style={{ color: 'black', fontSize: '13px', textAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'flex-start',marginLeft:'3px' }}>
  <span style={{ marginLeft: '4px', marginBottom: '2px',fontWeight:'bold',fontSize:'14px' }}>{item.name}</span>
  {item.variants && <p className="item-detailsp" style={{ marginLeft: '4px', marginTop: '0' }}>{item.variants} variants</p>}
</div>

          </div>
        ))}
      </div>

      <div className="footer">
        <button className="footer-button" style={{ width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007bff', border: '1px solid #007bff' }}>
          <FontAwesomeIcon icon={faPrint} style={{ marginRight: '10px', color: '#007bff' }} />
          Print Bill
        </button>
        <button className="footer-button primary" style={{ width: '300px' }}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CatalogPage;
