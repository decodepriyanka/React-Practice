import { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/products";
import ProductsGrid from "../components/ProductsGrid";
import Pagination from "../components/Pagination";
import "../index.css";

export default function ReactPaginationClient() {
    const [allProducts, setAllProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const PRODUCTS_PER_PAGE = 15;

    // Fetch once
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const products = await fetchAllProducts();
                setAllProducts(products);
                const pages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
                setTotalPages(pages);
                setVisibleProducts(products.slice(0, PRODUCTS_PER_PAGE));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Update visible products when page changes
    useEffect(() => {
        const start = (page - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;
        setVisibleProducts(allProducts.slice(start, end));
    }, [page, allProducts]);

    return (
        <div className="pagination-container">
            <h2 className="pagination-title">🛒 Product Pagination (Client-side)</h2>

            {loading && <p className="status-text">Loading products...</p>}
            {error && <p className="status-text error-text">{error}</p>}

            {!loading && !error && <ProductsGrid products={visibleProducts} />}

            {!loading && totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            )}
        </div>
    );
}
