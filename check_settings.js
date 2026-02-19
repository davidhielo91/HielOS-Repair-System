
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const s = await prisma.settings.findUnique({ where: { id: 1 } });
        const ready = s?.whatsappTemplateReady || '';

        console.log('Length:', ready.length);

        // Check for Replacement Character
        if (ready.includes('\uFFFD')) {
            console.log('FOUND REPLACEMENT CHARACTER (U+FFFD)!');
        } else {
            console.log('No replacement character found.');
        }

        const idx = ready.indexOf('listo');
        if (idx !== -1) {
            // Capture 10 chars, starting from "listo" (index) + 5 (length of "listo")
            // So we see what's immediately after "listo"
            const after = ready.substring(idx + 5, idx + 15);
            console.log('Chars after "listo":');
            for (let i = 0; i < after.length; i++) {
                console.log(`Index ${i}: Code ${after.charCodeAt(i).toString(16)} (Hex) - Char: ${after[i]}`);
            }
            console.log('Hex of chunk:', Buffer.from(after).toString('hex'));
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
