import { useState, useEffect } from "react";

export function fetchApi(url) {
  const [data, setData] = useState({
    urls: [{ signedUrl: "" }],
    urlsOri: [{ signedUrlOri: "" }],
    objectKeys: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before the fetch

        const response = await fetch(url); // Use await for the fetch

        if (!response.ok) {
          // Handle non-200 responses appropriately
          throw new Error(`Fetch error: ${response.statusText}`);
        }

        const fetchedData = await response.json(); // Use await for JSON parsing

        setData(fetchedData); // Set data after successful fetch
      } catch (error) {
        // Handle errors during fetch, parsing, or non-200 responses
        console.error("Error fetching data:", error);
        // Consider additional error handling as needed (e.g., setting error state)
      } finally {
        setLoading(false); // Always set loading to false after operation
      }
    };

    fetchData(); // Call the asynchronous function
  }, [url]); // useEffect dependency ensures fetchData() runs on url changes

  return { data, loading };
}