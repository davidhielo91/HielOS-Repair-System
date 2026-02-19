
async function main() {
    try {
        const res = await fetch("http://localhost:3000/api/orders?limit=10");
        console.log("Status:", res.status);
        if (!res.ok) {
            console.log("Error text:", await res.text());
            return;
        }
        const data = await res.json();
        console.log("Orders count:", data.orders?.length);
        if (data.orders?.length > 0) {
            console.log("First order status:", data.orders[0].status);
        }
    } catch (e) {
        console.error("Fetch error:", e);
    }
}

main();
