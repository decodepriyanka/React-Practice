import { useCallback, useEffect, useState } from "react";
import { fetchProductsPage } from "../api/products";
import ProductsGrid from "../components/ProductsGrid";
import Pagination from "../components/Pagination";
import "../index.css";

const LIMIT = 10;

export default function ReactPaginationServer() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setErr(null);

            const { products, total } = await fetchProductsPage({ page, limit: LIMIT });
            setProducts(products);
            setTotalPages(Math.max(1, Math.ceil(total / LIMIT)));
        } catch (e) {
            setErr(e.message || "Something went wrong");
            setProducts([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <div className="pagination-container">
            <h2 className="pagination-title">🛍 Product Pagination</h2>

            {loading && <p className="status-text">Loading...</p>}
            {err && <p className="status-text error-text">Error: {err}</p>}

            {!loading && <ProductsGrid products={products} />}

            {!loading && totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            )}
        </div>
    );
}
