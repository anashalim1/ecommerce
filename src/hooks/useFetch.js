import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(API_URL) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getData() {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL);
      console.log("data", data.data);
      setData(data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching recent data:", error);
      setError(error.response.data.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { data, error, loading };
}
