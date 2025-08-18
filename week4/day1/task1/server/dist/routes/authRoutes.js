"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = __importDefault(require("express-validator"));
const authController_1 = require("../controllers/authController");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
router.post('/users/register', [
    (0, express_validator_1.default)('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    (0, express_validator_1.default)('email')
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),
    (0, express_validator_1.default)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .isString()
        .withMessage('Password must be a string')
], validateRequest_1.validateRequest, authController_1.register);
router.post('/users/login', [
    (0, express_validator_1.default)('email')
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),
    (0, express_validator_1.default)('password')
        .exists()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be a string')
], validateRequest_1.validateRequest, authController_1.login);
exports.default = router;
