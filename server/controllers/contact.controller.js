import Contact from "../models/contact.model.js";

const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeAll = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All contacts removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { getAll, getById, create, update, remove, removeAll };
