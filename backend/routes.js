import express from 'express';
import { 
getAccountsForUser,
getAccount,
createAccount,
updateBalance,
removeAccount
 } from './src/controllers/accounts.js';

import 
{
updateEmail,
updatePassword
} from './src/controllers/users.js'
const router = express.Router()

/* Accounts  Collection CRUD */
router.get('/accounts/user',getAccountsForUser);
router.get('/accounts',getAccount);
router.post('/accounts',createAccount);
router.put('/accounts/balance',updateBalance);
router.delete('/accounts',removeAccount);
//router.delete('/accounts',removeAccount);

/* Users Collection CRUD*/
router.put('/accounts/email',updateEmail);
router.put('/accounts/password',updatePassword);

export default router
