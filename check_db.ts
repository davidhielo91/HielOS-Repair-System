
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const orders = await prisma.order.findMany({
            select: { id: true, orderNumber: true, status: true }
        });
        console.log("Orders found:", orders.length);
        orders.forEach(o => {
            console.log(`${o.orderNumber}: ${o.status}`);
        });
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
