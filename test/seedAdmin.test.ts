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