export async function fetchProductsPage({ page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // normalize
    return {
        products: Array.isArray(data?.products) ? data.products : [],
        total: Number.isFinite(data?.total) ? data.total : 0,
    };
}
