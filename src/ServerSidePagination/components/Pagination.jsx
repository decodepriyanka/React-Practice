export default function Pagination({ page, totalPages, onChange }) {
    const pagesArray =
        Number.isInteger(totalPages) && totalPages > 0
            ? Array.from({ length: totalPages }, (_, i) => i + 1)
            : [];

    const change = (p) => {
        if (p >= 1 && p <= totalPages && p !== page) onChange(p);
    };

    return (
        <div className="pagination">
            <span
                onClick={() => change(page - 1)}
                className={`page-arrow ${page <= 1 ? "pagination__disable" : ""}`}
                aria-label="Previous page"
                role="button"
            >
                ◀
            </span>

            {pagesArray.map((p) => (
                <span
                    key={p}
                    className={`page-number ${page === p ? "pagination__selected" : ""}`}
                    onClick={() => change(p)}
                    role="button"
                    aria-current={page === p ? "page" : undefined}
                >
                    {p}
                </span>
            ))}

            <span
                onClick={() => change(page + 1)}
                className={`page-arrow ${page >= totalPages ? "pagination__disable" : ""}`}
                aria-label="Next page"
                role="button"
            >
                ▶
            </span>
        </div>
    );
}
