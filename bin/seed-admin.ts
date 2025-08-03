#!/usr/bin/env node
import path from 'path';
import { seedAdmin } from '../src/seedAdmin';

const [,, uid] = process.argv;
if (!uid) {
    console.error('Usage: seed-admin <USER_UID>');
    process.exit(1);
}

seedAdmin(uid).catch(err => {
    console.error(err);
    process.exit(1);
});