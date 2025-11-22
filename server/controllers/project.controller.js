import Project from "../models/project.model.js";



export const getAll = async (_req, res) => {
  try { res.json(await Project.find()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

export const getById = async (req, res) => {
  try {
    const doc = await Project.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

export const create = async (req, res) => {
  try { const doc = await new Project(req.body).save(); res.status(201).json(doc); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

export const update = async (req, res) => {
  try {
    const doc = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

export const remove = async (req, res) => {
  try {
    const doc = await Project.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Project deleted" });
  } catch (e) { res.status(400).json({ error: e.message }); }
};

export const removeAll = async (_req, res) => {
  try { await Project.deleteMany(); res.json({ message: "All projects removed" }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
