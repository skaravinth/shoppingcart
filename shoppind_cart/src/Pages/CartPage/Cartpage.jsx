
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faUser, faTable, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTable } from 'react-table';

import Payment from '../../Components/Payment/Payment';
import CatalogPage from '../../Components/Catlog/Catlog';
import Items from '../../Components/Items/Items';

const Cartpage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState('payment');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setCurrentPage('item');
  };

  const handleAddToCart = (item, quantity, variant) => {
    const selectedVariant = item.variants.find(v => v.size === variant);
    const amount = selectedVariant.price * quantity;

    const newItem = {
      item: { ...item, selectedVariant: variant },
      quantity,
      amount,
    };

    setData(prevData => [...prevData, newItem]);
    setCurrentPage('catalog');
  };

  const incrementQty = (index) => {
    const newData = [...data];
    const selectedVariant = newData[index].item.variants.find(v => v.size === newData[index].item.selectedVariant);
    newData[index].quantity += 1;
    newData[index].amount = selectedVariant.price * newData[index].quantity;
    setData(newData);
  };

  const decrementQty = (index) => {
    const newData = [...data];
    const selectedVariant = newData[index].item.variants.find(v => v.size === newData[index].item.selectedVariant);
    if (newData[index].quantity > 1) {
      newData[index].quantity -= 1;
      newData[index].amount = selectedVariant.price * newData[index].quantity;
      setData(newData);
    }
  };

  const deleteItem = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Item',
        accessor: 'item.name',
        Cell: ({ value }) => (
          <span>{value}</span>
        ),
      },
      {
        Header: 'Qty',
        accessor: 'quantity',
        Cell: ({ row: { index }, value }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => decrementQty(index)}>-</button>
            <span style={{ margin: '0 10px' }}>{value}</span>
            <button onClick={() => incrementQty(index)}>+</button>
          </div>
        ),
      },
      {
        Header: 'Amount (SAR)',
        accessor: 'amount',
        Cell: ({ row: { index }, value }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{value}</span>
            <FontAwesomeIcon
              icon={faTrash}
              style={{ color: 'black', marginLeft: '200px', cursor: 'pointer',height:'20px',width:'20px' }}
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
      <div style={{ width: '870px', marginLeft: '20px', marginTop: '20px' }}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>
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
              width: '700px',
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
    marginLeft: '30px', 
    cursor: 'pointer', 
    width: '40px', 
    height: '40px',
    border: '1px solid black', 
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: currentPage !== 'payment' ? 'blue' : '', // Blue when not payment
  }}
>
  <FontAwesomeIcon icon={faBookOpen} style={{ color: currentPage !== 'payment' ? 'white' : '#3383ff', height: '25px', width: '25px' }} />
</div>




        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '16px' }}>
          <div style={{ marginLeft: '2px' }}>
            <h2 style={{ color: 'Black', marginBottom: '0px', display: 'inline', fontSize: '18px' }}>Cart Summary</h2>
            <p style={{ color: 'Black', fontSize: '15px', marginTop: '4px' }}>
              <span style={{ color: '#aeb6bf' }}>Order Id:</span> 00001
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '485px', marginTop: '10px' }}>
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
                marginLeft: '35px',
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
                marginLeft: '35px',
              }}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                style={{ color: 'black', marginLeft: '16px', marginTop: '10px', height: '20px' }}
              />
            </div>
          </div>
        </div>

        <div style={{marginTop:'40px'}}>
          <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', color: 'black' }}>
          <thead>
  {headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()} style={{ display: 'flex', justifyContent: 'space-between' }}>
      {headerGroup.headers.map((column) => (
        <th
          {...column.getHeaderProps()}
          style={{
            padding: '10px',
            borderTop: '1px solid black', // Top border
            borderBottom: '1px solid black', // Bottom border
            textAlign: 'left',
            flex: column.id === 'item' ? 2 : 1,
            minWidth: column.id === 'quantity' ? '80px' : '90px',
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
                        justifyContent: 'space-between',
                        borderBottom: '1px solid gray', // Full line below each row
                      }}
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: '10px',
                            textAlign: 'left',
                            flex: cell.column.id === 'item' ? 2 : 1,
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
        {currentPage === 'catalog' && <CatalogPage onItemClick={handleItemClick} />}
        {currentPage === 'item' && <Items item={selectedItem} onAddToCart={handleAddToCart} />}
      </div>
    </div>
  );
};

export default Cartpage;