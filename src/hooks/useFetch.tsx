import React, { useState, useEffect, useCallback } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const loadData = useCallback(
    async (shouldInvalidate?: boolean) => {
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
