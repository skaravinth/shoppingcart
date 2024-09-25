import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faUser, faTable, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTable } from 'react-table';
import './Cartpage.css'
import Button from '../../Components/Button/Button'

import Payment from '../../Components/Payment/Payment';
import CatalogPage from '../../Components/Catlog/Catlog';
import Items from '../../Components/Items/Items';

const Cartpage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState('payment');
  const [selectedItem, setSelectedItem] = useState(null);
  const [SelectedVariant,setSelectedVariant] = useState(null)
  const [amount,setamount] = useState(0)

  const handleItemClick = (item) => {
    setSelectedItem(item);
    console.log('Selected item in Cartpage:', item);
    setCurrentPage('item');
  };
  const handleVariantChange = (e) => {
    const newVariant = e.target.value;
    setSelectedVariant(newVariant);
    console.log("Selected Variant:", newVariant); 
  };
  
  const handleAddToCart = (item, quantity, variant, totalPrice) => {
    const existingItemIndex = data.findIndex(
      (cartItem) => cartItem.item.id === item.id && cartItem.variant === variant
    );
  
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedData = data.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
            totalPrice: cartItem.totalPrice + totalPrice,
          };
        }
        return cartItem;
      });
  
      setData(updatedData);
    } else {
    
      const newItem = {
        item,
        quantity,
        variant,
        totalPrice,
      };
      setData((prevData) => [...prevData, newItem]);
    }
  };
  
  

  const incrementQty = (index) => {
    const newData = [...data];

    // Check if index is valid
    if (index < 0 || index >= newData.length) {
      console.error('Index out of bounds:', index);
      return;
    }

    const item = newData[index].item;

    // Check if item and variants are defined
    if (item && item.variants) {
      let selectedVariant = null;
      for (let i = 0; i < item.variants.length; i++) {
        if (item.variants[i].size === item.selectedVariant) {
          selectedVariant = item.variants[i];
          break; // Exit loop once found
        }
      }


      if (selectedVariant) {
        newData[index].quantity += 1;
        newData[index].amount = selectedVariant.price * newData[index].quantity;
        setData(newData);
      } else {
        console.error('Selected variant not found:', item.selectedVariant);
      }
    } else {
      console.error('Item or variants are undefined for index:', index);
    }
  };

  const decrementQty = (index) => {
    const newData = [...data];

    
    if (index < 0 || index >= newData.length) {
      console.error('Index out of bounds:', index);
      return;
    }

    const item = newData[index].item;

    // Check if item and variants are defined
    if (item && item.variants) {
      let selectedVariant = null;

      // Loop through variants to find the selected variant
      for (let i = 0; i < item.variants.length; i++) {
        if (item.variants[i].size === item.selectedVariant) {
          selectedVariant = item.variants[i];
          break; // Exit loop once found
        }
      }

      // Check if selectedVariant is found and quantity is greater than 1
      if (selectedVariant && newData[index].quantity > 1) {
        newData[index].quantity -= 1;
        newData[index].amount = selectedVariant.price * newData[index].quantity;
        setData(newData);
      } else {
        console.error('Selected variant not found or quantity is 1:', item.selectedVariant);
      }
    } else {
      console.error('Item or variants are undefined for index:', index);
    }
  };
  

  const deleteItem = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };
  const totalAmount = data.reduce((sum, item) => {
    
    const amount = Number(item.totalPrice);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
  
  
  console.log('total amount is',totalAmount);
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Item',
        accessor: 'item',
        Cell: ({ value }) => (
          <span style={{fontSize:'15px',}}>{value}</span>
          
        ),
      },
      {
        Header: 'Qty',
        accessor: 'quantity',
        Cell: ({ row: { index }, value }) => (
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d5d8dc', width: '115px', backgroundColor: '#ffffff', borderRadius: '5px', height: '40px' }}>
            <button 
              style={{ 
                border: 'none', 
                backgroundColor: '#ffffff', 
                color: 'black', 
                outline: 'none', 
                cursor: 'pointer' 
              }} 
              onClick={() => decrementQty(index)}
              onMouseOver={(e) => e.currentTarget.style.outline = 'none'} 
            >
              -
            </button>
            <span style={{ margin: '0 10px' }}>{value}</span>
            <button className='button1'
              style={{ 
                backgroundColor: '#ffffff', 
                color: 'black', 
                outline: 'none', 
                border: 'none',
                cursor: 'pointer',
                marginLeft:'8px', 
                padding: '10px 10px' 
              }} 
              onClick={() => incrementQty(index)}
            >
              +
            </button>
          </div>
        ),
      },
      {
        Header: 'Amount (SAR)',
        accessor: 'totalPrice',
        Cell: ({ row: { index }, value }) => (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span style={{ margin: '0 auto', textAlign: 'center', flexGrow: 1,fontSize:'15px',fontWeight:'bold' }}> SAR {(value * data[index].quantity).toFixed(2)}</span>
            <FontAwesomeIcon
              icon={faTrash}
              style={{ color: 'black', cursor: 'pointer', marginRight: '20px' }}
              onClick={() => deleteItem(index)}
            />
          </div>
        ),
      },
      
      
    ],
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div style={{ width: '94.6vw', backgroundColor: 'white', height: '718px', display: 'flex' }}>
      <div style={{ width: '920px', marginTop: '20px' }}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'row', marginLeft: '20px' }}>
          <FaSearch
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#aaa',
            }}
          />
          <input
            type="text"
            placeholder="Search"
            style={{
              width: '720px',
              padding: '10px 10px 10px 35px',
              backgroundColor: 'white',
              border: '1px solid #d5d8dc',
              borderRadius: '5px',
              height:'20px'
            }}
          />
       <div
  onClick={() => setCurrentPage(currentPage === 'catalog' ? 'payment' : 'catalog')}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'blue';
    e.currentTarget.firstChild.style.color = 'white';
  }}
  onMouseLeave={(e) => {
    if (currentPage === 'payment') {
      e.currentTarget.style.backgroundColor = '';
      e.currentTarget.firstChild.style.color = '#3383ff';
    }
  }}
  style={{ 
    marginLeft: '20px', 
    cursor: 'pointer', 
    width: '40px', 
    height: '40px',
    border: '1px solid #d5d8dc', 
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: currentPage !== 'payment' ? '#007bff' : '', 
  }}
>
  <FontAwesomeIcon icon={faBookOpen} style={{ color: currentPage !== 'payment' ? 'white' : '#007bff', height: '25px', width: '25px' }} />
</div>




        </div>

            
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '16px',marginLeft:'20px'}}>
          <div style={{ marginLeft: '2px' }}>
            <h2 style={{ color: 'Black', marginBottom: '0px', display: 'inline', fontSize: '18px' }}>Cart Summary</h2>
            <p style={{ color: 'Black', fontSize: '15px', marginTop: '4px' }}>
              <span style={{ color: '#aeb6bf' }}>Order Id:</span> 00001
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '535px', marginTop: '10px' }}>
            <div style={{ height: '40px', width: '40px', border: '1px solid #d5d8dc', borderRadius: '5px' }}>
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: 'black', marginLeft: '12px', marginTop: '8px', height: '20px' }}
              />
            </div>
            <div
              style={{
                height: '40px',
                width: '40px',
                border: '1px solid #d5d8dc',
                borderRadius: '5px',
                marginLeft: '20px',
              }}
            >
              <FontAwesomeIcon
                icon={faTable}
                style={{ color: 'black', marginLeft: '11px', marginTop: '10px', height: '20px' }}
              />
            </div>
            <div
              style={{
                height: '40px',
                width: '40px',
                border: '1px solid #d5d8dc',
                borderRadius: '5px',
                marginLeft: '20px',
              }}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                style={{ color: 'black', marginLeft: '19px', marginTop: '10px', height: '20px' }}
              />
            </div>
          </div>
        </div>

        <div style={{marginTop:'20px'}}>
        <table
  {...getTableProps()}
  style={{ width: '100%', borderCollapse: 'collapse', color: 'black' }}
>
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr
        {...headerGroup.getHeaderGroupProps()}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {headerGroup.headers.map((column) => (
          <th
            {...column.getHeaderProps()}
            style={{
              padding: column.id === 'item' ? '10px 10px 10px 32px' : '10px 10px 10px 10px', // Add extra left padding for 'item' column
              borderTop: '1px solid #d5d8dc',
              borderBottom: '1px solid #d5d8dc',
              flex: column.id === 'item' ? 2 : 2, // Increase flex value for 'item' column
              textAlign: column.id === 'item' ? 'left' : 'center',
              color: 'grey',
            }}
          >
            {column.render('Header')}
          </th>
        ))}
      </tr>
    ))}
  </thead>

  <tbody {...getTableBodyProps()}>
    {data.length === 0 ? (
      <tr>
        <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
          <img
            src="https://media.istockphoto.com/id/1400586811/vector/web.jpg?s=612x612&w=0&k=20&c=r5g0JlssvfuZN_fPTSwD4eoqSxXVxNX21w0Xs0NsWNo="
            alt="Empty Cart"
            style={{ width: '100px', marginBottom: '5px', marginTop: '100px' }}
          />
          <h3>Cart is empty</h3>
          <p>Scan barcode or add items from catalog</p>
        </td>
      </tr>
    ) : (
      rows.map((row) => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #e0e0e0',
             
            }}
          >
            {row.cells.map((cell) => (
              <td
                {...cell.getCellProps()}
                style={{
                  display: 'flex',
                  justifyContent: cell.column.id === 'item' ? 'flex-start' : 'center',
                  alignItems: 'center',
                  paddingLeft: cell.column.id === 'item' ? '30px' : '10px', // Add extra left padding for 'item' cells
                  flex: cell.column.id === 'item' ? 2 : 2,
                  fontSize: '14px',
                  color: '#333',
                  fontWeight: cell.column.id === 'item' ? 'bold' : 'normal',
                  textAlign: cell.column.id === 'item' ? 'left' : 'center',
                }}
              >
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      })
    )}
  </tbody>
</table>





        </div>
        
      </div>
      <div style={{ width: '550px', height: '718px', backgroundColor: '#f4f6f7',marginLeft:'grey' }}>
        {currentPage === 'payment' && <Payment totalAmount={totalAmount} />}
        {currentPage === 'catalog' && <CatalogPage selecteditem={handleItemClick}  />}
        {currentPage === 'item' && <Items item={selectedItem} onAddToCart={handleAddToCart} selectedvarient={handleVariantChange}/>}
      </div>
    </div>
  );
};

export default Cartpage; 