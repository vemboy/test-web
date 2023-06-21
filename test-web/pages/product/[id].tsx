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
    axios.get(`http://3.15.27.30:3001/products/${id}`)
    .then((res) => {
      console.log("NUMBER 1 THEN GOT TRIGGERED")
      const product = res.data;
      console.log(product);
      setProduct(product);
    })
    .then(data => {
      console.log("NUMBER 2 THEN GOT TRIGGERED")
      console.log(data)
    })
    .catch(error => {
      console.log("ERROR GOT TRIGGERED")
      console.log(error.response.data.error)
    })

    
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
