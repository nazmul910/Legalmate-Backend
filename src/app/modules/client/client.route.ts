import  express  from "express"
import { ClientController } from "./client.controller";

const router = express.Router()

router.get('/',ClientController.getAllClients)
router.get('/:id',ClientController.getSingleClient)

export const ClientRouter = router;