import React from 'react';
import './modal.css';

const Modal = ({ showModal, setShowModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Words Tab</h2>
        <button onClick={() => setShowModal(false)}>Close Modal</button>
      </div>
    </div>
  );
};

export default Modal;