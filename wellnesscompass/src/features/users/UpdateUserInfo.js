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
  const initialFormData = {
    id: result._id,
    username: result.username,
  };
  const [formData, setFormData] = useState({
    id: result._id,
    username: result.username,
  });
  const [isFormValid, setIsFormValid] = useState(true); // Track form validity

  const toggleAdd = () => {
    setShowAdd(showAdd === 'hide' ? 'show' : 'hide');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'userConsent') {
      if (value !== '') {
        setFormData({
          ...formData,
          [name]: value === 'true', // Set userConsent to true if 'true' is selected, false otherwise
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: { value: parseInt(value), date: formattedDate },
      });
    }
  };

  const validateInput = (e) => {
    const { name, value } = e.target;
    setIsFormValid(true); // Reset form validity

    // Check if the input value is empty
    if (value === '') {
      return;
    }

    const intValue = parseInt(value);

    if (isNaN(intValue)) {
      alert('Please enter an integer.');
      setIsFormValid(false); // Set form as invalid
    } else {
      if (name === 'weight' && (intValue < 50 || intValue > 500)) {
        alert('Weight should be between 50 and 500 lbs.');
        setIsFormValid(false); // Set form as invalid
      } else if (name === 'height' && (intValue < 36 || intValue > 90)) {
        alert('Height should be between 36 and 90 inches.');
        setIsFormValid(false); // Set form as invalid
      } else if (name === 'hoursSlept' && (intValue < 2 || intValue > 16)) {
        alert('Hours slept should be between 2 and 16 hours');
        setIsFormValid(false); // Set form as invalid
      }
    }
  };

  const handlePatch = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return; // Prevent data submission if form is invalid
    }

    try {
      const response = await axiosPrivate.patch('http://localhost:3500/users', formData);
      console.log('Updated resource:', response.data);
      document.getElementById('weight').value = '';
      document.getElementById('height').value = '';
      document.getElementById('steps').value = '';
      document.getElementById('activeMinutes').value = '';
      document.getElementById('hoursSlept').value = '';
      document.getElementById('dailyMeals').value = '';
      setFormData({
        id: result._id,
        username: result.username,
      });
      
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
        <div>
          <label htmlFor="hoursSlept">Add Hours Slept:</label>
          <input
            type="integer"
            id="hoursSlept"
            name="hoursSlept"
            onChange={handleChange}
            onBlur={validateInput}
          />
        </div>
        <div>
          <label htmlFor="dailyMeals">Add Calories:</label>
          <input
            type="integer"
            id="dailyMeals"
            name="dailyMeals"
            onChange={handleChange}
            onBlur={validateInput}
          />
        </div>
        <div>
          <label htmlFor="userConsent">User Consent (true/false):</label>
            <select id="userConsent" name="userConsent" onChange={handleChange}>
              <option value=""> </option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUserInfo;
