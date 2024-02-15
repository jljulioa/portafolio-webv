import { useState, useEffect } from "react";

export function fetchApi(url) {
  const [data, setData] = useState({
    urls: [{ signedUrl: "" }],
    urlsOri: [{ signedUrlOri: "" }],
    objectKeys: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://47rjce8lqb.execute-api.us-east-1.amazonaws.com/urls")
      .then((Response) => Response.json())
      .then((data) => setData(data))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}
