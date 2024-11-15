import { useState } from "react";
import axios from "axios";

const useFetchUser = () => {
  const [user, setUser] = useState([]);
  axios.get(`http://localhost:3000/users`).then((res) => setUser(res.data));
  return { user };
};

export default useFetchUser;
