import { useState, useEffect, useCallback } from "react";

const useFetch = (url, revalidate = false, interval = 6, headers = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revalidateKey, setRevalidateKey] = useState("");

  const loadData = useCallback(async () => {
    try {
      const res = await fetch(url, headers);
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    const revalidateInterval = setInterval(() => {
      if (revalidate) {
        setRevalidateKey(Math.random().toString());
      }
    }, interval * 1000);
    return () => clearInterval(revalidateInterval);
  }, [interval, revalidate]);

  useEffect(() => {
    loadData();
  }, [url, revalidateKey]);

  return { data, loading, error, revalidate: loadData };
};

export default useFetch;
