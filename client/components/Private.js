import React, { useEffect, useState } from "react";
import { get } from "axios";

const Private = () => {
  const [data, setData] = useState(null);

  useEffect(async () => {
    try {
      const response = await get("http://localhost:3001/api/private");
      setData(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return data ? <div>{data}</div> : <div>Private</div>;
};

export default Private;
