import React from 'react';
import { FaSearch } from 'react-icons/fa';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTable } from 'react-table';
import {useState} from 'react'

const Searchpage = () => {
  const [data, setData] = useState([]);

  
  const incrementQty = (index) => {
    const newData = [...data];
    newData[index].quantity += 1;
    setData(newData);
  };

 
  const decrementQty = (index) => {
    const newData = [...data];
    if (newData[index].quantity > 1) {
      newData[index].quantity -= 1;
      setData(newData);
    }
  };

  
  const columns = React.useMemo(
    () => [
      { Header: 'Item', accessor: 'item' },
      {
        Header: 'Qty',
        accessor: 'quantity',
        Cell: ({ row: { index }, value }) => (
          <div style={{ display: 'flex', alignItems: 'center' ,color:'black'}}>
            <button onClick={() => decrementQty(index)}>-</button>
            <span style={{ margin: '0 10px' }}>{value}</span>
            <button onClick={() => incrementQty(index)}>+</button>
          </div>
        ),
      },
      { Header: 'Amount (SAR)', accessor: 'amount' },
    ],
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  return (
    <>
    <div style={{display:'flex',flexDirection:'row',height:'500px'}}>

  
  
    <div style={{width:'500px',backgroundColor:'blue',marginLeft:'30px'}}>
        
    <div style={{ backgroundColor: '#f9fafb', padding:'20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <h3 style={{ fontSize: '18px', marginBottom: '10px',color:'black' }}>Payment summary</h3>

        <span style={{marginTop:'20px',color:'black'}}>Ashwin</span>
        <span style={{marginTop:'20px'}} role="img" aria-label="calendar">📅</span>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{color:'black'}}>Sub total</span>
          <span style={{color:'black'}}>SAR 0.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{color:'black'}}>Taxable amount</span>
          <span style={{color:'black'}}>SAR 0.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{color:'black'}}>Total tax</span>
          <span style={{color:'black'}}>SAR 0.00</span>
        </div>
      </div>
      <hr style={{ border: 'none', borderBottom: '1px solid #dcdcdc', marginBottom: '10px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <strong style={{color:'black'}}>Grand total</strong>
        <strong style={{color:'black'}}>SAR 0.00</strong>
      </div>
    </div>

    </div>
    </div>
    </>
 
  );
};



export default Searchpage;
