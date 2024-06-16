import { Request, Response } from "express";
import { startSession } from "mongoose";
import { createObjectCsvWriter } from 'csv-writer';
import { ContactModel } from "../models/Contact.model";
import { PhoneNumberModel } from "../models/PhoneNumber.model";
import logger from "../utils/logger";
import path from "path";
import fs from "fs";
import { singleImageUpload } from "../utils/fileUpload.multer";

export const createContactService = async (req: Request, res: Response) => {
    const session = await startSession();
    session.startTransaction();
    try {
        const { name, phoneNumbers } = req.body;
        let contact = new ContactModel({ name });
        await contact.save({ session });

        for (const phoneNumber of phoneNumbers) {
            let phone = new PhoneNumberModel({
                ...phoneNumber,
                contact: contact._id,
            });
            await phone.save({ session });
        }

        await session.commitTransaction();
        session.endSession();
        logger.info("Contact created successfully", { contact });

        return contact;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        logger.error("Error creating contact", { error });
        throw new Error("Unable to create a contact" + error);
    }
};

export const updateContactService = async (req: Request, res: Response) => {
    try {
        const contact = await ContactModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!contact || contact.deleted) {
            logger.warn("Contact not found for update", { contactId: req.params.id });
            return res.status(404).json({ msg: "Contact not found" });
        }
        logger.info("Contact updated successfully", { contactId: req.params.id });
        return contact;
    } catch (error) {
        logger.error("Error updating contact", { error });
        throw new Error("Error updating contact" + error);
    }
};

export const deleteContactService = async (req: Request, res: Response) => {
    try {
        const contact = await ContactModel.findByIdAndUpdate(
            req.params.id,
            { deleted: true },
            { new: true }
        );
        if (!contact) {
            logger.warn("Contact not found for deletion", {
                contactId: req.params.id,
            });
            return res.status(404).json({ msg: "Contact not found" });
        }
        logger.info("Contact soft deleted successfully", {
            contactId: req.params.id,
        });
        return true;
    } catch (error) {
        logger.error('Error soft deleting contact', { error });
        throw new Error("Error soft deleting contact" + error);
    }
};

export const searchContactsService = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        const contacts = await ContactModel.find({
            deleted: false,
            $or: [{ name: new RegExp(query as string, "i") }],
        }).populate({
            path: "phoneNumbers",
            match: { number: new RegExp(query as string, "i") },
        });

        logger.info("Searched contacts", { query, count: contacts.length });
        return contacts;
    } catch (error) {
        logger.error("Error searching contacts", { error });
        throw new Error("Error searching contacts" + error);
    }
};


export const contactsExportCSVService = async (req: Request) => {
    try {

        const contacts = await ContactModel.find({ deleted: false }).populate('phoneNumbers');
        const csvPath = path.join(__dirname, '..', 'contacts.csv');
        const writer = createObjectCsvWriter({
            path: csvPath,
            header: [
                {
                    id: 'name', title: 'Name'
                },
                {
                    id: 'phoneNumbers', title: 'Phone Number'
                }
            ]
        });

        const records = contacts?.map(contact => ({
            name: contact.name,
            //@ts-ignore
            phoneNumbers: contact.phoneNumbers?.map(pn => pn.number).join(',')
        }));

        await writer.writeRecords(records);
        logger.info('Contacts exported to CSV', { csvPath });
        return csvPath; // res.download(csvPath)
    } catch (error) {
        logger.error('Error exporting contacts to CSV', { error });
        throw new Error((error as Error).message)
    }
}


export const getAllContactsService = async (req: Request) => {
    try {
        const contacts = await ContactModel.find({ deleted: false }).populate('phoneNumbers');
        logger.info('Fetched all contacts', { count: contacts.length });

        return contacts

    } catch (error) {
        logger.error('Error fetching contacts', { error });
        throw new Error((error as Error).message)
    }
}

export const uploadImageService = async (req: Request, res: Response): Promise<{ imagePath: string }> => {
    const { id } = req.params;
    
    return new Promise((resolve, reject) => {
        singleImageUpload(req, res, async (err) => {
            if (err) {
                logger.error('Error uploading image', { error: err.message });
                return reject(new Error(err.message));
            }

            if (!req.file) {
                const errorMessage = 'No file uploaded';
                logger.error(errorMessage);
                return reject(new Error(errorMessage));
            }

            try {
                const contact = await ContactModel.findById(id);
                if (!contact || contact.deleted) {
                    const errorMessage = 'Contact not found';
                    logger.error(errorMessage, { contactId: id });
                    return reject(new Error(errorMessage));
                }

                if (contact.image) {
                    // Delete the existing image file if it exists
                    const existingImagePath = path.resolve(contact.image);
                    fs.unlink(existingImagePath, (unlinkErr) => {
                        if (unlinkErr) {
                            logger.warn('Failed to delete existing image', { error: unlinkErr.message });
                        } else {
                            logger.info('Existing image deleted successfully', { existingImagePath });
                        }
                    });
                }

                contact.image = req.file.path;
                await contact.save();

                logger.info('Image uploaded and contact updated successfully', { imagePath: req.file.path, contactId: id });
                resolve({ imagePath: req.file.path });
            } catch (error) {
                logger.error('Error updating contact with image path', { error: (error as Error).message });
                reject(new Error('Error updating contact with image path: ' + (error as Error).message));
            }
        });
    });
};