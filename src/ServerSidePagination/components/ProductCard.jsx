export default function ProductCard({ product }) {
    return (
        <div className="products__single">
            <img src={product.thumbnail} alt={product.title} />
            <span className="product-title">{product.title}</span>
        </div>
    );
}
