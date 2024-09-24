import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faPerson, faPercent, faTicket, faPrint } from '@fortawesome/free-solid-svg-icons';

const PaymentSummary = ({ totalAmount }) => {
  return (
    <div style={{width:'525px',height:'680px'}}>
      <div style={{ backgroundColor: '#f9fafb', padding:'20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '10px',color:'black' }}>Payment summary</h3>
          <span style={{marginTop:'20px',marginLeft:'240px'}} role="img" aria-label="calendar">📅</span>
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
  <strong style={{ color: 'black',marginTop:'7px' }}>Grand total</strong>
  <strong style={{ color: 'black',fontSize:'26px',marginTop:'1.5px' }}>SAR {(totalAmount + totalAmount * 0.15).toFixed(2)}</strong> {/* Grand total = totalAmount + tax */}
</div>
        <hr style={{ border: 'none', borderBottom: '1px solid #dcdcdc', width: '100%',marginTop:'208px' }} />

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginLeft:'200px',height:'50px' }}>
       
           <FontAwesomeIcon icon={faNoteSticky} style={{ color: 'black' }} />
           <p style={{ color: 'black', marginLeft: '10px' }}>Add notes</p>
        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid #dcdcdc' }} />

        <div style={{display:'flex',height:'70px', width: '100%',gap:'10px'}}>
          <button style={{ backgroundColor: 'white', border: '1px solid black', height: '45px',outline:'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '25px 30px',marginTop:'10px',marginLeft:'10px' }}>
            <FontAwesomeIcon icon={faPerson} style={{ color: 'black', marginRight: '5px' }} />
            <p style={{ color: 'black', margin: '0', fontSize: '16px' }}>Customer</p>
          </button>
          <button style={{ backgroundColor: 'white', border: '1px solid black', height: '45px',outline:'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '25px 30px',marginTop:'10px' ,marginLeft:'10px'}}>
            <FontAwesomeIcon icon={faTicket} style={{ color: 'black', marginRight: '5px' }} />
            <p style={{ color: 'black', margin: '0', fontSize: '16px' }}>Copoun</p>
          </button>
          <button style={{ backgroundColor: 'white', border: '1px solid black', height: '45px',outline:'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '25px 35px',marginTop:'10px',marginLeft:'5px' }}>
            <FontAwesomeIcon icon={faPercent} style={{ color: 'black', marginRight: '5px' }} />
            <p style={{ color: 'black', margin: '0', fontSize: '16px' }}>Discount</p>
          </button>
        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid #dcdcdc', width: '100%' }} />

        <div style={{display:'flex',marginTop:'15px',height:'50px'}}>
          <button style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', padding: '25px 46px', cursor: 'pointer',border:'1px solid #007bff',marginLeft:'10px',outline:'none' }}>
            <FontAwesomeIcon icon={faPrint} style={{ color: '#007bff', marginRight: '5px' }} />
            <p style={{ color: '#007bff', margin: '0', fontSize: '14px' }}>Print</p>
          </button>

          <button style={{ backgroundColor: '#007bff', display: 'flex', alignItems: 'center', padding: '25px 20px', cursor: 'pointer',border:'1px solid #007bff',marginLeft:'20px',width:'100%',outline:'none'}}>
            <p style={{ color: 'white', margin: '0', fontSize: '15px',textAlign:'center',marginLeft:'70px' }}>Proceed to Payment</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
