import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const backendURL = process.env.NEXT_PUBLIC_URL;

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const [count, setCount] = useState(0); //initial value of this
  const [product, setProduct] = useState<{
    id: number;
    title: string;
    desc: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // If no id, just bail
    if (!id) return;
    setCount((count) => count + 1); //increment this Hook
    axios
      .get(`https://${backendURL}/products/${id}`)
      .then((res) => {
        const product = res.data;
        console.log(product);
        setProduct(product);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setError("Response produced status code outside server range");
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          setError("No response from server :(");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          setError("Could not make request...");
        }
        console.log(error.config);
      });
  }, [id]);

  return (
    <div>
      <h1 style={{ marginTop: "5vh", marginLeft: "5vw" }}>{product?.title}</h1>
      <h2 style={{ marginTop: "1vh", marginLeft: "5vw" }}>ID: {id}</h2>
      <p style={{ marginLeft: "5vw", marginTop: "1vh", width: "20vw" }}>
        {product?.desc}
      </p>
      <div style={{ marginLeft: "5vw" }}>
        <a href="http://localhost:3000/products">back</a>
        <p> Amount of times UseEffect is called: {count} </p>
        {error ? <p> Displaying error: {error} </p> : null}
      </div>
    </div>
  );
}
