const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { sendContactEmail } = require("../controllers/contactController");

const router = Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Nombre requerido"),
    body("email").isEmail().withMessage("Email no válido"),
    body("business").trim().notEmpty().withMessage("Nombre del negocio requerido"),
    body("phone").trim().notEmpty().withMessage("Teléfono requerido"),
    body("message").trim().notEmpty().withMessage("Indica qué quieres automatizar"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  sendContactEmail
);

module.exports = router;
