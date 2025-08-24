import express from 'express';
import { ProfileController } from './profle.controller';
import auth from '../../midlleWear/auth';
import USER_ROLE from '../../constants/userRole';


const router = express.Router();

router.get('/',auth(USER_ROLE.admin,USER_ROLE.client,USER_ROLE.lawyer), ProfileController.getLawyerProfile);

export const ProfileRouter = router;