import axios from "axios";

export default async function Home() {
  const response = await axios.get("http://localhost:3001/products");
  console.log(response.data);
  return response.data.map(
    (product: { id: number; title: string; desc: string }) => {
      return (
        <div>
          <a href={`product/${product.id}`}>{product.title}</a>
        </div>
      );
    }
  );
}
