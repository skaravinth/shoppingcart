import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faPerson, faPercent, faTicket, faPrint } from '@fortawesome/free-solid-svg-icons';

const PaymentSummary = ({ totalAmount }) => {
  return (
    <div style={{width:'550px',height:'718px'}}>
      <div style={{ backgroundColor: '#f9fafb', padding:'20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '10px',color:'black' }}>Payment summary</h3>
          <span style={{marginTop:'20px',marginLeft:'260px'}} role="img" aria-label="calendar">📅</span>
          <span style={{marginTop:'20px',color:'black',marginLeft:'10px'}}>Ashwin</span>
        </div>

        <div style={{ marginBottom: '10px'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
  <span style={{ color: 'black' }}>Sub total</span>
  <span style={{ color: 'black' }}>SAR {totalAmount.toFixed(2)}</span>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
  <span style={{ color: 'black' }}>Taxable amount</span>
  <span style={{ color: 'black' }}>SAR {(totalAmount).toFixed(2)}</span> {/* Taxable amount = totalAmount */}
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
  <span style={{ color: 'black' }}>Total tax</span>
  <span style={{ color: 'black' }}>SAR {(totalAmount * 0.15).toFixed(2)}</span> {/* Total tax = 15% of totalAmount */}
</div>

     
        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid #dcdcdc', width: '100%' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
  <strong style={{ color: 'black' }}>Grand total</strong>
  <strong style={{ color: 'black' }}>SAR {(totalAmount + totalAmount * 0.15).toFixed(2)}</strong> {/* Grand total = totalAmount + tax */}
</div>
        <hr style={{ border: 'none', borderBottom: '1px solid #dcdcdc', width: '100%',marginTop:'220px' }} />

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginLeft:'200px',height:'50px' }}>
       
           <FontAwesomeIcon icon={faNoteSticky} style={{ color: 'black' }} />
           <p style={{ color: 'black', marginLeft: '10px' }}>Add notes</p>
        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid #dcdcdc', width: '100%' }} />

        <div style={{display:'flex',height:'70px'}}>
          <button style={{ backgroundColor: 'white', border: '1px solid black', height: '45px',width:'130px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px',marginLeft:'25px',marginTop:'10px' }}>
            <FontAwesomeIcon icon={faPerson} style={{ color: 'black', marginRight: '5px' }} />
            <p style={{ color: 'black', margin: '0', fontSize: '14px' }}>Customer</p>
          </button>
          <button style={{ backgroundColor: 'white', border: '1px solid black', height: '45px',width:'130px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px',marginLeft:'30px',marginTop:'10px' }}>
            <FontAwesomeIcon icon={faTicket} style={{ color: 'black', marginRight: '5px' }} />
            <p style={{ color: 'black', margin: '0', fontSize: '14px' }}>Copoun</p>
          </button>
          <button style={{ backgroundColor: 'white', border: '1px solid black', height: '45px',width:'130px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px',marginLeft:'30px',marginTop:'10px' }}>
            <FontAwesomeIcon icon={faPercent} style={{ color: 'black', marginRight: '5px' }} />
            <p style={{ color: 'black', margin: '0', fontSize: '14px' }}>Discount</p>
          </button>
        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid #dcdcdc', width: '100%' }} />

        <div style={{display:'flex',marginTop:'15px',height:'50px'}}>
          <button style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', padding: '10px 40px', cursor: 'pointer',border:'1px solid blue',marginLeft:'25px' }}>
            <FontAwesomeIcon icon={faPrint} style={{ color: 'blue', marginRight: '5px' }} />
            <p style={{ color: 'blue', margin: '0', fontSize: '14px' }}>Print</p>
          </button>

          <button style={{ backgroundColor: 'blue', display: 'flex', alignItems: 'center', padding: '10px 80px', cursor: 'pointer',border:'1px solid blue',marginLeft:'30px'}}>
            <p style={{ color: 'white', margin: '0', fontSize: '14px' }}>Proceed to Payment</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
