import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-amaz0n-clone-so.cloudfunctions.net/api',
  //'http://localhost:5001/amaz0n-clone-so/us-central1/api', // THE API (cloud function) URL
});
export default instance;
