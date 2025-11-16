import "./index.css";
import ReactPaginationClient from "./pages/ReactPaginationClient";

export default function ClientSidePagination() {
    return <ReactPaginationClient />;
}

// function ClientSidePagination() {
//     const [allProducts, setAllProducts] = useState([]);
//     const [visibleProducts, setVisibleProducts] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const PRODUCTS_PER_PAGE = 15;

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 const res = await fetch("https://dummyjson.com/products?limit=200");
//                 if (!res.ok) throw new Error(`HTTP ${res.status}`);

//                 const data = await res.json();
//                 if (!data?.products) throw new Error("No products found");

//                 setAllProducts(data.products);
//                 const pages = Math.ceil(data.products.length / PRODUCTS_PER_PAGE);
//                 setTotalPages(pages);
//                 setVisibleProducts(data.products.slice(0, PRODUCTS_PER_PAGE));
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const start = (page - 1) * PRODUCTS_PER_PAGE;
//         const end = start + PRODUCTS_PER_PAGE;
//         setVisibleProducts(allProducts.slice(start, end));
//     }, [page, allProducts]);

//     const selectPageHandler = (selectedPage) => {
//         if (
//             selectedPage >= 1 &&
//             selectedPage <= totalPages &&
//             selectedPage !== page
//         ) {
//             setPage(selectedPage);
//             window.scrollTo({ top: 0, behavior: "smooth" });
//         }
//     };

//     const pagesArray =
//         totalPages > 0
//             ? Array.from({ length: totalPages }, (_, i) => i + 1)
//             : [];

//     return (
//         <div className="pagination-container">
//             <h2 className="pagination-title">🛒 Product Pagination (Client-side)</h2>

//             {loading && <p className="status-text">Loading products...</p>}
//             {error && <p className="status-text error-text">{error}</p>}

//             {!loading && visibleProducts.length > 0 && (
//                 <div className="products">
//                     {visibleProducts.map((prod) => (
//                         <div className="products__single" key={prod.id}>
//                             <img src={prod.thumbnail} alt={prod.title} />
//                             <span className="product-title">{prod.title}</span>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {!loading && pagesArray.length > 1 && (
//                 <div className="pagination">
//                     <span
//                         onClick={() => selectPageHandler(page - 1)}
//                         className={`page-arrow ${page <= 1 ? "pagination__disable" : ""}`}
//                     >
//                         ◀
//                     </span>

//                     {pagesArray.map((p) => (
//                         <span
//                             key={p}
//                             className={`page-number ${page === p ? "pagination__selected" : ""}`}
//                             onClick={() => selectPageHandler(p)}
//                         >
//                             {p}
//                         </span>
//                     ))}

//                     <span
//                         onClick={() => selectPageHandler(page + 1)}
//                         className={`page-arrow ${page >= totalPages ? "pagination__disable" : ""}`}
//                     >
//                         ▶
//                     </span>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ClientSidePagination;
