import { Router } from "express";
import EmailController from "./app/Controllers/EmailController.js"

const router  = Router();

router.post('/email', EmailController.email);
router.post('/confirm-cod', EmailController.emailCodigo);

export default router 