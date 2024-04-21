import axios from 'axios';
export default function getMenu() {
   axios.get('/api/admin/menu/role').then((res) => {
     console.log(res.data);
     return res.data;
   });
    return [];
  }