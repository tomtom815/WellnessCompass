import React, {  useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { FaPlus } from 'react-icons/fa';

import useRefreshToken from '../../hooks/useRefreshToken';

function UpdateUserInfo({ userData, setUserData, ...props }) {
  const axiosPrivate = useAxiosPrivate();
  const today = new Date();
  const { refreshAccessToken } = useRefreshToken(); // Assuming your useRefreshToken hook provides this function

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  const [showAdd, setShowAdd] = useState('hide');
  const [formData, setFormData] = useState({
    // Initialize the form data with default values if needed
    id: props.result._id,
    username: props.result.username,
  });

  const toggleAdd = () => {
    if (showAdd === 'hide') {
      setShowAdd('show');
    } else {
      setShowAdd('hide');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: { value: parseInt(value), date: formattedDate },
    });
  };

  const handlePatch = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.patch('http://localhost:3500/users', formData);

      window.location.reload();
      // Handle the response data or perform any necessary actions here
      console.log('Updated resource:', response.data);

      // Optionally reset the form or perform other actions after a successful update
      document.getElementById('weight').value = '';
      document.getElementById('height').value = '';
      document.getElementById('steps').value = '';
      document.getElementById('activeMinutes').value = '';
     
    } catch (error) {
      // Handle errors here
      console.error('Error updating resource:', error);

      // Check if the error is related to an expired token
      if (error.response && error.response.status === 401) {
        // Attempt to refresh the access token
        try {
          await refreshAccessToken(); // This should refresh the token
          // Retry the request here or handle it as needed
        } catch (refreshError) {
          // Handle token refresh failure
          console.error('Error refreshing token:', refreshError);
          // You may want to log the user out or show an error message
        }
      }
    }
  };

  return (
    
    <div class="updateUserInfo">
      <button className="accordionBanner" onClick={() => toggleAdd()}>Add Info <FaPlus/></button>
      
        <form className={showAdd} onSubmit={handlePatch}>
        <div>
          <label htmlFor="weight">Add New Weight:</label>
          <input
            type="integer"
            id="weight"
            name="weight"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="height">Add New Height (in inches):</label>
          <input
            type="integer"
            id="height"
            name="height"
            
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="steps">Add Steps:</label>
          <input
            type="integer"
            id="steps"
            name="steps"
            
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="activeMinutes">Add Active Minutes:</label>
          <input
            type="integer"
            id="activeMinutes"
            name="activeMinutes"
           
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      
    </div>
  );
}

export default UpdateUserInfo;
