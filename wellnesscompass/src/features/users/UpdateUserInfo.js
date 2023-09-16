import React, { useState } from 'react';
import axios from 'axios';
import SingleUser from './SingleUsersList';

function UpdateUserInfo(props) {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    const [formData, setFormData] = useState({
    // Initialize the form data with default values if needed
    id: props.result._id,
    username: props.result.username,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:{ "value": parseInt(value), "date": formattedDate},
    });
    
  };

  const handlePatch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch('http://localhost:3500/users', formData);

      // Handle the response data or perform any necessary actions here
      console.log('Updated resource:', response.data);

      // Optionally reset the form or perform other actions after a successful update
      setFormData({
        
      });
      window. location. reload();
    } catch (error) {
      // Handle errors here
      console.error('Error updating resource:', error);
    }
  };

  return (
    
    <div>
      <h2>Add Info</h2>
      <form onSubmit={handlePatch}>
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