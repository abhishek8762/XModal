import React, { useState } from 'react';
import './App.css'; // Ensure you have CSS for modal styling

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      username: '',
      email: '',
      dob: '',
      phone: ''
    });
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!formData.email.includes('@')) newErrors.email = 'Invalid email. Please check your email address.';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    else if (new Date(formData.dob) > new Date()) newErrors.dob = alert('Invalid date of birth. Date of birth cannot be in the future.');
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (formData.phone.length !== 10) newErrors.phone = alert('Invalid phone number. Please enter a 10-digit phone number.');

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert('Form submitted successfully!');
      closeModal();
    }
  };

  return (
    <div className="App">
      <h1>User Detail Modal</h1>
      <button onClick={openModal} className='open-form'>Open Form</button>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div >
                <label>Username:</label>
                <input type="text" id="username" value={formData.username} onChange={handleChange} required />
                {errors.username && <p style={{color :"red"}}>{errors.username}</p>}
              </div>
              <div style={{margin :"10px"}}>
                <label >Email:</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required/>
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div style={{margin : "10px"}}>
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
                {errors.dob && <p>{errors.dob}</p>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
                {errors.phone && <p>{errors.phone}</p>}
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
