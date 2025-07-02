import React from 'react';
import Link from 'next/link';

const success = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
      <Link href="/">
        <button style={{ marginTop: '20px' }}>Back to Home</button>
      </Link>
    </div>
  );
};

export default success;
