
import React from 'react';

function Popup({ onClose }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg p-10 text-black">Please login to view this page.</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Close</button>
      </div>
    </div>
  );
}

export default Popup;
