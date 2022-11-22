import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(
    async (shouldInvalidate) => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: shouldInvalidate
            ? {
                "Cache-Control": "no-cache",
              }
            : {},
        });
        const data = await res.json();
        setData(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    },
    [url]
  );

  const invalidate = useCallback(() => {
    loadData(true);
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [url]);

  return { data, loading, error, invalidate };
};

export default useFetch;
