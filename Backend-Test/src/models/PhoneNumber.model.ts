import { model, Schema } from "mongoose";
const PhoneNumberScheme = new Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['home', 'work', 'mobile'],
        default: 'mobile'
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        required: true
    }
})

export const PhoneNumberModel = model('PhoneNumber', PhoneNumberScheme);
