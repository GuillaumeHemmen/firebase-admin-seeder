import * as admin from 'firebase-admin';
import path from 'path';

function initAdmin(): void {
    if (!admin.apps.length) {
        const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const serviceAccount = require(serviceAccountPath);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
}

export async function seedAdmin(uid: string): Promise<void> {
    initAdmin();
    await admin.auth().setCustomUserClaims(uid, { roles: ['admin'] });
    console.log(`✅ ${uid} is now an admin.`);
}