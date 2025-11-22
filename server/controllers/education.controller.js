import Education from "../models/education.model.js";

export const getAll = async (_req, res) => {
  try { res.json(await Education.find()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

export const getById = async (req, res) => {
  try {
    const doc = await Education.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

export const create = async (req, res) => {
  try { const doc = await new Education(req.body).save(); res.status(201).json(doc); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

export const update = async (req, res) => {
  try {
    const doc = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

export const remove = async (req, res) => {
  try {
    const doc = await Education.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Education deleted" });
  } catch (e) { res.status(400).json({ error: e.message }); }
};

export const removeAll = async (_req, res) => {
  try { await Education.deleteMany(); res.json({ message: "All education records removed" }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
