import { useState, useEffect } from "react";

export function fetchApiUser(url) {
  const [dataUser, setDataUser] = useState({
    urls: [{ signedUrl: "" }],
    urlsOri: [{ signedUrlOri: "" }],
    objectKeys: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://nqmcdup752.execute-api.us-east-1.amazonaws.com/urls")
      .then((Response) => Response.json())
      .then((dataUser) => setDataUser(dataUser))
      .finally(() => setLoading(false));
  }, []);

  return { dataUser, loading };
}
