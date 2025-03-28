import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

const Table = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <table className="w-full border border-collapse border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border">
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">${product.price}</td>
              <td className="p-2 border">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;