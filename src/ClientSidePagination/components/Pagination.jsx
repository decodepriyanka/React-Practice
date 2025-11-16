export default function Pagination({ page, totalPages, onChange }) {
    const pagesArray =
        totalPages > 0
            ? Array.from({ length: totalPages }, (_, i) => i + 1)
            : [];

    const handleClick = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
            onChange(selectedPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="pagination">
            <span
                onClick={() => handleClick(page - 1)}
                className={`page-arrow ${page <= 1 ? "pagination__disable" : ""}`}
            >
                ◀
            </span>

            {pagesArray.map((p) => (
                <span
                    key={p}
                    className={`page-number ${page === p ? "pagination__selected" : ""}`}
                    onClick={() => handleClick(p)}
                >
                    {p}
                </span>
            ))}

            <span
                onClick={() => handleClick(page + 1)}
                className={`page-arrow ${page >= totalPages ? "pagination__disable" : ""}`}
            >
                ▶
            </span>
        </div>
    );
}
