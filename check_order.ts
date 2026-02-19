import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const orders = await prisma.order.findMany({
            select: { id: true, orderNumber: true, status: true },
        });
        console.log("Orders:");
        for (const o of orders) {
            console.log(`  id=${o.id}  num=${o.orderNumber}  status=${o.status}`);
            // Try fetching each by ID
            const full = await prisma.order.findUnique({
                where: { id: o.id },
                include: { usedParts: true, selectedServices: true, statusHistory: true, notes: true, photos: true, payments: true }
            });
            if (!full) {
                console.log(`  ERROR: ${o.orderNumber} not found by ID!`);
            } else {
                console.log(`  OK: found, payments=${full.payments?.length ?? 0}`);
            }
        }
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
