import { body, validationResult } from 'express-validator';
import { Request,Response,NextFunction} from 'express';
export const validateContact = [
  body('name').notEmpty().withMessage('Name is required'),
  body('phoneNumbers').isArray({ min: 1 }).withMessage('At least one phone number is required'),
  body('phoneNumbers.*.number').isString().withMessage('Phone number must be a string'),
  body('phoneNumbers.*.type').isIn(['home', 'work', 'mobile']).withMessage('Invalid phone number type'),

  (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
