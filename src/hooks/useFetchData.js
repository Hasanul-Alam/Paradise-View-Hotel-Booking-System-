import { useState } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [data, setData] = useState([]);

  // Function to manually trigger data fetching
  const fetchData = async () => {
    setLoading(true); // Start loading before request
    try {
      const response = await axios.get(url); // Axios request
      setError(null); // Reset any previous error
      setData(response.data); // Set fetched data
    } catch (err) {
      setError(err.message); // Set error if request fails
    } finally {
      setLoading(false); // Stop loading after request
    }
  };

  // Return the fetch function along with data, loading, and error states
  return { loading, data, error, fetchData };
};

export default useFetchData;
