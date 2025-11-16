import ReactPaginationServer from "./pages/ReactPaginationServer";

export default function ServerSidePagination() {
  return <ReactPaginationServer />;
}


// function ReactPagination() {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState(null);

//   const fetchProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       setErr(null);

//       const res = await fetch(
//         `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
//       );
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();

//       const total = Number.isFinite(data?.total) ? data.total : 0;
//       const pages = Math.max(1, Math.ceil(total / 10));

//       setProducts(Array.isArray(data?.products) ? data.products : []);
//       setTotalPages(pages);
//     } catch (e) {
//       setErr(e.message || "Something went wrong");
//       setProducts([]);
//       setTotalPages(1);
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const selectPageHandler = (selectedPage) => {
//     if (
//       Number.isInteger(selectedPage) &&
//       selectedPage >= 1 &&
//       selectedPage <= totalPages &&
//       selectedPage !== page
//     ) {
//       setPage(selectedPage);
//     }
//   };

//   const pagesArray =
//     Number.isInteger(totalPages) && totalPages > 0
//       ? Array.from({ length: totalPages }, (_, i) => i + 1)
//       : [];

//   return (
//     <div className="pagination-container">
//       <h2 className="pagination-title">🛍 Product Pagination</h2>

//       {loading && <p className="status-text">Loading...</p>}
//       {err && <p className="status-text error-text">Error: {err}</p>}

//       {!loading && products.length > 0 && (
//         <div className="products">
//           {products.map((prod) => (
//             <div className="products__single" key={prod.id}>
//               <img src={prod.thumbnail} alt={prod.title} />
//               <span className="product-title">{prod.title}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       {!loading && pagesArray.length > 1 && (
//         <div className="pagination">
//           <span
//             onClick={() => selectPageHandler(page - 1)}
//             className={`page-arrow ${page <= 1 ? "pagination__disable" : ""}`}
//           >
//             ◀
//           </span>

//           {pagesArray.map((p) => (
//             <span
//               key={p}
//               className={`page-number ${page === p ? "pagination__selected" : ""}`}
//               onClick={() => selectPageHandler(p)}
//             >
//               {p}
//             </span>
//           ))}

//           <span
//             onClick={() => selectPageHandler(page + 1)}
//             className={`page-arrow ${page >= totalPages ? "pagination__disable" : ""}`}
//           >
//             ▶
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ReactPagination;
