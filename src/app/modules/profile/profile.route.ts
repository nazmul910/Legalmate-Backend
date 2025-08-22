import express from 'express';
import { ProfileController } from './profle.controller';
import auth from '../../midlleWear/auth';


const router = express.Router();

router.get('/',auth("lawyer"), ProfileController.getLawyerProfile);

export const ProfileRouter = router;