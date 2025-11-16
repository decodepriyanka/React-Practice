import ProductCard from "./ProductCard";

export default function ProductsGrid({ products = [] }) {
    if (!products.length) return null;
    return (
        <div className="products">
            {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
            ))}
        </div>
    );
}
