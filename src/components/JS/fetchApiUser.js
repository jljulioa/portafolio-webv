import { useState, useEffect } from "react";

export function fetchApiUser() {
  const GET_API_URL =
    "https://nqmcdup752.execute-api.us-east-1.amazonaws.com/urls";
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [dataUser, setDataUser] = useState({
    urls: [{ signedUrl: "" }],
    urlsOri: [{ signedUrlOri: "" }],
    objectKeys: [],
  });

  const handleClick = () => {
    setCount(Math.random()); // Update count to trigger fetch
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before the fetch

      try {
        const response = await fetch(GET_API_URL); // Use await for the fetch
        const dataUser = await response.json(); // Use await for JSON parsing

        if (response.ok) {
          // Check for successful response
          setDataUser(dataUser);
          console.log(dataUser.objectKeys); // Access data after successful fetch
        } else {
          // Handle non-200 responses appropriately
          console.error("Fetch error:", response.statusText);
        }
      } catch (error) {
        // Handle other errors during fetch or parsing
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Always set loading to false after operation
        console.log("useEffect ran with count:", count);
      }
    };

    // Reset user data before fetching new data
    setDataUser({
      urls: [{ signedUrl: "" }],
      urlsOri: [{ signedUrlOri: "" }],
      objectKeys: [],
    });

    fetchData(); // Call the asynchronous function
  }, [count]);

  return { dataUser, loading, handleClick, count };
}
