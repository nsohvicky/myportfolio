import Contact from "../models/Contact.js";

// GET /api/contacts
export const getAll = async (_req, res) => {
  try { res.json(await Contact.find()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

// GET /api/contacts/:id
export const getById = async (req, res) => {
  try {
    const doc = await Contact.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

// POST /api/contacts
export const create = async (req, res) => {
  try {
    const doc = await new Contact(req.body).save();
    res.status(201).json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

// PUT /api/contacts/:id
export const update = async (req, res) => {
  try {
    const doc = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

// DELETE /api/contacts/:id
export const remove = async (req, res) => {
  try {
    const doc = await Contact.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Contact deleted" });
  } catch (e) { res.status(400).json({ error: e.message }); }
};

// DELETE /api/contacts
export const removeAll = async (_req, res) => {
  try {
    await Contact.deleteMany();
    res.json({ message: "All contacts removed" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
