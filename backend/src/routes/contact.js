const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { sendContactEmail } = require("../controllers/contactController");

const router = Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Nombre requerido"),
    body("email").isEmail().withMessage("Email no válido"),
    body("message").trim().isLength({ min: 10 }).withMessage("Mensaje demasiado corto"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  sendContactEmail
);

module.exports = router;
