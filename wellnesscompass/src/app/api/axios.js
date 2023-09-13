import axios from 'axios';

export default axios.create({
  // Port that Node.js backend is running on
  baseURL: 'http://localhost:3500'
});