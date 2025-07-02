import React from 'react';
import Link from 'next/link';

const cancel = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>❌ Payment Cancelled</h1>
      <p>Your payment was not completed. You can try again.</p>
      <Link href="/">
        <button style={{ marginTop: '20px' }}>Back to Home</button>
      </Link>
    </div>
  );
};

export default cancel;
