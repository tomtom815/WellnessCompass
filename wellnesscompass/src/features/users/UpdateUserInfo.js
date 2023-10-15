import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { FaPlus } from 'react-icons/fa';
import useRefreshToken from '../../hooks/useRefreshToken';

function UpdateUserInfo({ result, onSubmission }) {
  const axiosPrivate = useAxiosPrivate();
  const today = new Date();
  const { refreshAccessToken } = useRefreshToken();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  const [showAdd, setShowAdd] = useState('hide');
  const [formData, setFormData] = useState({
    id: result._id,
    username: result.username,
  });

  const toggleAdd = () => {
    setShowAdd(showAdd === 'hide' ? 'show' : 'hide');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: { value: parseInt(value), date: formattedDate },
    });
  };

  const validateInput = (e) => {
    const { name, value } = e.target;

    // Check if the input value is empty
    if (value === '') {
      return;
    }

    const intValue = parseInt(value);

    if (isNaN(intValue)) {
      alert('Please enter an integer.');
    } else {
      if (name === 'weight' && (intValue < 50 || intValue > 500)) {
        alert('Weight should be between 50 and 500 lbs.');
      } else if (name === 'height' && (intValue < 36 || intValue > 90)) {
        alert('Height should be between 36 and 90 inches.');
      }
    }
  };

  const handlePatch = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.patch('http://localhost:3500/users', formData);
      console.log('Updated resource:', response.data);
      onSubmission(); // Call the function to fetch updated user data
      document.getElementById('weight').value = '';
      document.getElementById('height').value = '';
      document.getElementById('steps').value = '';
      document.getElementById('activeMinutes').value = '';
    } catch (error) {
      console.error('Error updating resource:', error);
      if (error.response && error.response.status === 401) {
        try {
          await refreshAccessToken();
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
        }
      }
    }
  };

  return (
    <div className="updateUserInfo">
      <button className="accordionBanner" onClick={() => toggleAdd()}>Add Info <FaPlus/></button>

      <form className={showAdd} onSubmit={handlePatch}>
        <div>
          <label htmlFor="weight">Add New Weight:</label>
          <input
            type="integer"
            id="weight"
            name="weight"
            onChange={handleChange}
            onBlur={validateInput}
          />
        </div>
        <div>
          <label htmlFor="height">Add New Height (in inches):</label>
          <input
            type="integer"
            id="height"
            name="height"
            onChange={handleChange}
            onBlur={validateInput}
          />
        </div>
        <div>
          <label htmlFor="steps">Add Steps:</label>
          <input
            type="integer"
            id="steps"
            name="steps"
            onChange={handleChange}
            onBlur={validateInput}
          />
        </div>
        <div>
          <label htmlFor="activeMinutes">Add Active Minutes:</label>
          <input
            type="integer"
            id="activeMinutes"
            name="activeMinutes"
            onChange={handleChange}
            onBlur={validateInput}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUserInfo;
