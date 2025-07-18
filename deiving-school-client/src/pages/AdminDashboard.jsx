import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const dummyClients = [
      {
        name: 'Ram',
        phone: '2345678996',
        applicationNumber: '734567890097',
        registrationDate: '2025-07-01',
        classOfVehicle: 'LMV',
        isLicenseHolder: true,
        learningLicenseDate: '2025-07-05',
        learningLicenseExpiry: '2025-09-05',
        testDate: '2025-08-10',
        retestDate: '',
        totalFees: '8000',
        advancePayment: '3000',
        middlePayment: '2500',
        finalPayment: '2500',
      },
    ];
    setClients(dummyClients);
  }, []);

  const handleClientClick = (client) => {
    if (selectedClient && selectedClient.applicationNumber === client.applicationNumber) {
      setSelectedClient(null); // Toggle off
    } else {
      setSelectedClient(client);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    setFormData({ ...selectedClient });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditMode(false);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-topbar">
        <input
          type="text"
          placeholder="Search clients..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="dashboard-main">
        <div className={`sidebar-client-list ${selectedClient ? '' : 'full-width'}`}>
          {filteredClients.map((client, index) => (
            <div
              key={index}
              className={`client-item ${selectedClient?.applicationNumber === client.applicationNumber ? 'active' : ''}`}
              onClick={() => handleClientClick(client)}
            >
              <h4>{client.name}</h4>
              <p><strong>Phone:</strong> {client.phone}</p>
              <p><strong>App No:</strong> {client.applicationNumber}</p>
            </div>
          ))}
        </div>

        {selectedClient && (
          <div className="client-detail-panel">
            <div className="client-detail-columns">
              <div className="left-column">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> {selectedClient.name}</p>
                <p><strong>Phone:</strong> {selectedClient.phone}</p>
                <p><strong>Application No:</strong> {selectedClient.applicationNumber}</p>
                <p><strong>Registration Date:</strong> {selectedClient.registrationDate}</p>
              </div>
              <div className="right-column">
                <h3>Driving School Details</h3>
                <p><strong>Class of Vehicle:</strong> {selectedClient.classOfVehicle}</p>
                <p><strong>License Holder:</strong> {selectedClient.isLicenseHolder ? 'Yes' : 'No'}</p>
                <p><strong>LL Date:</strong> {selectedClient.learningLicenseDate}</p>
                <p><strong>LL Expiry:</strong> {selectedClient.learningLicenseExpiry}</p>
                <p><strong>Test Date:</strong> {selectedClient.testDate}</p>
                <p><strong>Retest Date:</strong> {selectedClient.retestDate || 'N/A'}</p>
              </div>
            </div>

            <div className="payment-info-box">
              <h3>Payment Info</h3>
              <p><strong>Total Fees:</strong> ₹{selectedClient.totalFees}</p>
              <p><strong>Advance:</strong> ₹{selectedClient.advancePayment}</p>
              <p><strong>Middle:</strong> ₹{selectedClient.middlePayment}</p>
              <p><strong>Final:</strong> ₹{selectedClient.finalPayment}</p>
            </div>

            <div className="action-buttons">
              <button onClick={handleEditClick}>Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editMode ? 'Edit Client' : 'View Client'}</h2>
            <div className="modal-form">
              {Object.keys(formData).map((field, index) => (
                <div className="modal-input" key={index}>
                  <label>{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <div className="modal-buttons">
                <button onClick={handleModalClose}>Close</button>
                {editMode && (
                  <button
                    onClick={() => {
                      setClients((prev) =>
                        prev.map((c) =>
                          c.applicationNumber === selectedClient.applicationNumber ? { ...formData } : c
                        )
                      );
                      setSelectedClient({ ...formData });
                      handleModalClose();
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
