import axios from 'axios';

export default axios.create({
  baseURL: process.env.TGS_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // TGS specific
    'Api': 'Tgstation.Server.Api/' + process.env.TGS_API_VERSION
  }
});