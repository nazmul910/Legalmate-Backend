import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { LawyerRoutes } from "../modules/lawyer/lawyer.route";
import { ClientRouter } from "../modules/client/client.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { ProfileRouter } from "../modules/profile/profile.route";


const router = Router();

const moduleRoutes = [
  {
    path:'/auth',
    route:AuthRouter
  },
  {
    path:'/users',
    route:userRoutes
  },
  {
    path:'/lawyers',
    route:LawyerRoutes
  },
  {
    path:'/clients',
    route:ClientRouter
  },
  {
    path:'/profile',
    route:ProfileRouter
  }
]

moduleRoutes.forEach(route => router.use(route.path , route.route));

export default router;