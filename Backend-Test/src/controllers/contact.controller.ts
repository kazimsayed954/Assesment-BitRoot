import { Request, Response } from "express";
import { contactsExportCSVService, createContactService, deleteContactService, getAllContactsService, searchContactsService, updateContactService, uploadImageService } from "../services/contact.service";

export const createContactController = async (req: Request, res: Response) => {
  try {
    const contacts = await createContactService(req, res);
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateContactController = async (req: Request, res: Response) => {
    try {
        const contact = await updateContactService(req, res);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
export const deleteContactController = async (req: Request, res: Response) => {
    try {
        const result = await deleteContactService(req, res);
        res.status(200).json({ success: result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
export const searchContactsController = async (req: Request, res: Response) => {
    try {
        const contacts = await searchContactsService(req, res);
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const contactsExportCSVController = async (req: Request, res: Response) => {
    try {
        const csvPath = await contactsExportCSVService(req);
        res.status(200).download(csvPath);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getAllContactsController = async (req: Request, res: Response) => {
    try {
        const contacts = await getAllContactsService(req);
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const uploadImageController = async (req: Request, res: Response) => {
    try {
        const result = await uploadImageService(req, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
