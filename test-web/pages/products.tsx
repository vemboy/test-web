import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const backendURL = process.env.NEXT_PUBLIC_URL;

export default function Page() {
  const [products, setProducts] = useState<
    Array<{
      id: number;
      title: string;
      desc: string;
    }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // if (products.length == 0) {
    //   return;
    // }
    axios
      .get(`http://${backendURL}/products/`)
      .then((res) => {
        const product = res.data;
        console.log(product);
        setProducts(product);
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
  }, []);

  const productComponents = products?.map(
    (product: { id: number; title: string; desc: string }) => {
      return (
        <div>
          <a href={`product/${product.id}`}>{product.title}</a>
        </div>
      );
    }
  );

  return (
    <div>
      {productComponents} {error ? <p> Displaying error: {error} </p> : null}
    </div>
  );
}
