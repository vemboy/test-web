import { useRouter } from "next/router";
import axios, {AxiosError} from "axios";
import { useEffect, useState } from "react";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<{
    id: number;
    title: string;
    desc: string;
  } | null>(null);
  useEffect(() => {
    axios.get(`http://3.15.27.30:3001/products/${id}`).then((res) => {
      const product = res.data;
      console.log(product);
      setProduct(product);
    });

  axios.get(`http://3.15.27.30:3001/products/3`)
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
  });

  return (
    <div>
      <h1 style={{ marginTop: "5vh", marginLeft: "5vw" }}>{product?.title}</h1>
      <h2 style={{ marginTop: "1vh", marginLeft: "5vw" }}>ID: {id}</h2>
      <p style={{ marginLeft: "5vw", marginTop: "1vh", width: "20vw" }}>
        {product?.desc}
      </p>
      <div style={{ marginLeft: "5vw" }}>
        <a href="/">back</a>
      </div>
    </div>
  );
}
