/**
 * MIT License
 *
 * Copyright (c) 2025 Guillaume Van Hemmen
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import * as admin from 'firebase-admin';
import path from 'path';

function initAdmin(): void {
    if (!admin.apps.length) {
        const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');
        // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-unsafe-assignment,no-undef
        const serviceAccount = require(serviceAccountPath);
        admin.initializeApp({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            credential: admin.credential.cert(serviceAccount),
        });
    }
}

export async function seedAdmin(uid: string): Promise<void> {
    initAdmin();
    await admin.auth().setCustomUserClaims(uid, { roles: ['admin'] });
    process.stdout.write(`✅ ${uid} is now an admin.`);
}