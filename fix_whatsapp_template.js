
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const s = await prisma.settings.findUnique({ where: { id: 1 } });
        if (!s) return;

        let ready = s.whatsappTemplateReady || '';
        const output = ready.replace(/\u2705/g, ''); // Remove ✅

        if (ready !== output) {
            console.log('Fixing template...');
            console.log('Old:', ready);
            console.log('New:', output);
            await prisma.settings.update({
                where: { id: 1 },
                data: { whatsappTemplateReady: output }
            });
            console.log('Template updated successfully.');
        } else {
            console.log('No emoji found to fix.');
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
