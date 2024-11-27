import React from 'react';

function FeesReminder() {
  const feesList = [
    { name: 'Transport Fees', lastDate: '2024-12-01' },
    { name: 'Book Fees', lastDate: '2024-11-30' },
    { name: 'Exam Fees', lastDate: '2024-12-10' },
    { name: 'Mess Fees', lastDate: '2024-11-25' },
    { name: 'Hostel Fees', lastDate: '2024-12-05' },
  ];

  const getRandomAmount = () => (Math.random() * 5000 + 100).toFixed(2); // Random amount between 100 and 5100
  const getRandomDue = () => Math.random() > 0.5; // Randomly assign a due status

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Fees Remainder</h2>
      </div>
        <button style={{ backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 15px', cursor: 'pointer' }}>
          View All
        </button>
      </div>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', background: '#f9f9f9' }}>
        {feesList.map((fee, index) => {
          const amount = getRandomAmount();
          const isDue = getRandomDue();
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: index !== feesList.length - 1 ? '1px solid #ddd' : 'none',
              }}
            >
              <div>
                <p style={{ margin: '0', fontWeight: 'bold' }}>{fee.name}</p>
                <span style={{ color: isDue ? 'red' : '#28a745', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {isDue ? 'Due' : 'Paid'}
                </span>
              </div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>${amount}</p>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0', fontSize: '0.9rem', color: '#555' }}>Last Date</p>
                <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: 'bold' }}>{fee.lastDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeesReminder;
