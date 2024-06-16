import express from "express";
import {
    createContactController,
    updateContactController,
    deleteContactController,
    searchContactsController,
    contactsExportCSVController,
    getAllContactsController,
    uploadImageController
} from "../controllers/contact.controller";

const contactRouter = express.Router();

contactRouter.post('/contacts', createContactController);
contactRouter.put('/contacts/:id', updateContactController);
contactRouter.delete('/contacts/:id', deleteContactController);
contactRouter.get('/contacts/search', searchContactsController);
contactRouter.get('/contacts/export-csv', contactsExportCSVController);
contactRouter.get('/contacts', getAllContactsController);
contactRouter.post('/upload-image/:id', uploadImageController);

export default contactRouter;