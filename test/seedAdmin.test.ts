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
import path from 'path';
const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');
// Mock service-account.json import to prevent load errors
jest.mock(serviceAccountPath, () => ({}), { virtual: true });

import * as admin from 'firebase-admin';
import { seedAdmin } from '../src/seedAdmin';

type AuthMock = { setCustomUserClaims: jest.Mock<Promise<void>, [string, object]> };

// Mock firebase-admin
jest.mock('firebase-admin', () => {
    const apps: any[] = [];
    const initializeApp = jest.fn(() => apps.push({}));
    const credential = { cert: jest.fn() };
    const authMock: AuthMock = {
        setCustomUserClaims: jest.fn<Promise<void>, [string, object]>((uid, claims) => Promise.resolve()),
    };
    return {
        apps,
        initializeApp,
        credential,
        auth: () => authMock,
    };
});

describe('seedAdmin', () => {
    const uid = 'test-uid';
    it('sets custom claims and logs success', async () => {
        console.log = jest.fn();
        await seedAdmin(uid);
        const authMock = admin.auth() as unknown as AuthMock;
        expect(authMock.setCustomUserClaims).toHaveBeenCalledWith(uid, { roles: ['admin'] });
        expect(console.log).toHaveBeenCalledWith(`✅ ${uid} is now an admin.`);
    });
});