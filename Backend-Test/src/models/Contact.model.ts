import { model, Schema } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

export const ContactModel = model('Contact', contactSchema);
