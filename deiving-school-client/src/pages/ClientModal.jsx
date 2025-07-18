import React from "react";
import "./AdminDashboard.css";

const ClientModal = ({ client, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="client-modal">
        <h2>Client Details</h2>
        <div className="modal-columns">
          <div className="column">
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>Application Number:</strong> {client.applicationNumber}</p>
            <p><strong>Registration Date:</strong> {client.registrationDate}</p>
            <p><strong>Is License Holder:</strong> {client.isLicenseHolder ? "Yes" : "No"}</p>
          </div>
          <div className="column">
            <p><strong>Class of Vehicle:</strong> {client.classOfVehicle}</p>
            <p><strong>Learning License:</strong> {client.learningLicenseDate}</p>
            <p><strong>Expiry:</strong> {client.learningLicenseExpiry}</p>
            <p><strong>Test Date:</strong> {client.testDate}</p>
            <p><strong>Retest Date:</strong> {client.retestDate}</p>
          </div>
        </div>
        <div className="payment-section">
          <h3>Payment Details</h3>
          <p><strong>Total Fees:</strong> ₹{client.totalFees}</p>
          <p><strong>Advance:</strong> ₹{client.advancePayment}</p>
          <p><strong>Middle:</strong> ₹{client.middlePayment}</p>
          <p><strong>Final:</strong> ₹{client.finalPayment}</p>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ClientModal;
