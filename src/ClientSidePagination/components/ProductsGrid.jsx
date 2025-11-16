import ProductCard from "./ProductCard";

export default function ProductsGrid({ products = [] }) {
    if (!products.length) return <p className="status-text">No products found</p>;

    return (
        <div className="products">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}
