import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

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
