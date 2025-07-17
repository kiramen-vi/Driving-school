import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    applicationNumber: '',
    registrationDate: '',
    learningLicenseDate: '',
    learningLicenseExpiry: '',
    classOfVehicle: '',
    isLicenseHolder: false,
    testDate: '',
    retestDate: '',
    totalFees: '',
    advancePayment: '',
    middlePayment: '',
    finalPayment: '',
    advanceDateTime: '',
    middleDateTime: '',
    finalDateTime: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/create-client`, formData);
      alert('Client created successfully!');
      setFormData({
        name: '',
        phone: '',
        applicationNumber: '',
        registrationDate: '',
        learningLicenseDate: '',
        learningLicenseExpiry: '',
        classOfVehicle: '',
        isLicenseHolder: false,
        testDate: '',
        retestDate: '',
        totalFees: '',
        advancePayment: '',
        middlePayment: '',
        finalPayment: '',
        advanceDateTime: '',
        middleDateTime: '',
        finalDateTime: ''
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard - Register New Client</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-section">
          <h4>Personal Info</h4>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input name="applicationNumber" placeholder="Application Number" value={formData.applicationNumber} onChange={handleChange} required />
          <input name="registrationDate" type="date" placeholder="Registration Date" value={formData.registrationDate} onChange={handleChange} required />
        </div>

        <div className="form-section">
          <h4>Driving Details</h4>
          <input name="learningLicenseDate" type="date" placeholder="Learning License Date" value={formData.learningLicenseDate} onChange={handleChange} />
          <input name="learningLicenseExpiry" type="date" placeholder="Learning License Expiry" value={formData.learningLicenseExpiry} onChange={handleChange} />
          <input name="classOfVehicle" placeholder="Class of Vehicle" value={formData.classOfVehicle} onChange={handleChange} />
          <label>
            <input type="checkbox" name="isLicenseHolder" checked={formData.isLicenseHolder} onChange={handleChange} />
            License Holder?
          </label>
          <input name="testDate" type="date" placeholder="Test Date" value={formData.testDate} onChange={handleChange} />
          <input name="retestDate" type="date" placeholder="Retest Date (if any)" value={formData.retestDate} onChange={handleChange} />
        </div>

        <div className="form-section">
          <h4>Payment Details</h4>
          <input name="totalFees" placeholder="Total Fees" value={formData.totalFees} onChange={handleChange} />
          <input name="advancePayment" placeholder="Advance Payment" value={formData.advancePayment} onChange={handleChange} />
          <input name="advanceDateTime" type="datetime-local" value={formData.advanceDateTime} onChange={handleChange} />
          <input name="middlePayment" placeholder="Middle Payment" value={formData.middlePayment} onChange={handleChange} />
          <input name="middleDateTime" type="datetime-local" value={formData.middleDateTime} onChange={handleChange} />
          <input name="finalPayment" placeholder="Final Payment" value={formData.finalPayment} onChange={handleChange} />
          <input name="finalDateTime" type="datetime-local" value={formData.finalDateTime} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
