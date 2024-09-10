import { Router } from 'express';
import { createUser, getAllUsers, getUserByUsername, softDeleteUser, restoreUser } from './user.controller';
import { checkPermission, validateAccessToken } from '@/middlewares';

const router = Router();

router.post('/users', validateAccessToken, checkPermission(['create-users']), createUser);
router.get('/users', getAllUsers);
router.get('/users/:username', getUserByUsername);
router.delete('/users/:userId', softDeleteUser);
router.patch('/users/:userId/restore', restoreUser);

export { router as userRoutes };
