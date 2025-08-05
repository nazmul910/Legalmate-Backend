import  express  from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../utils/ValidateRequenst";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get('/',UserControllers.getAllUsers);
router.post('/createAUser',
  validateRequest(UserValidation.createuserValidationSchema),
  UserControllers.createAUser
);


export const userRoutes = router;