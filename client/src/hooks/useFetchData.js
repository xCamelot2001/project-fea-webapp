import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
  // State for the data we're fetching
  const [data, setData] = useState(null);

  // State to keep track of whether we're currently fetching data (loading)
  const [loading, setLoading] = useState(false);

  // State to hold any error that occurs during the data fetching
  const [error, setError] = useState(null);

  useEffect(() => {
    // A function to fetch data from the server
    const fetchData = async () => {
      setLoading(true); // Set loading state to true when the request starts
      setError(null);   // Clear any existing errors

      try {
        const response = await axios.get(url); // Attempt to fetch data from the URL
        setData(response.data); // If successful, set the data state to the response data
      } catch (e) {
        setError(e); // If an error occurs, set the error state to the caught error
      } finally {
        setLoading(false); // Set loading state to false once the request is complete
      }
    };

    // Call the fetchData function if the URL is provided
    if (url) {
      fetchData();
    }
  }, [url]); // The effect will re-run if the URL changes

  // Return the data, loading, and error states so they can be used by the calling component
  return { data, loading, error };
};

export default useFetchData;
