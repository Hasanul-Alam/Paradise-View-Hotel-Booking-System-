import { useState } from "react";
import axios from "axios";

const useFetchUser = () => {
  const [user, setUser] = useState([]);
  axios.get(`https://paradise-view-server.onrender.com/users`).then((res) => setUser(res.data));
  return { user };
};

export default useFetchUser;
