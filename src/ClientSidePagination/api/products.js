export async function fetchAllProducts() {
    const res = await fetch("https://dummyjson.com/products?limit=200");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data?.products) throw new Error("No products found");
    return data.products;
}
