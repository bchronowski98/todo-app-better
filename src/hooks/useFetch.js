import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(url);
        const data1 = await res.json();
        setData(data1);
        setLoading(false);
        console.log(data1);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    loadData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
