import Glass from "../models/glass.js";

export const getGlasses = async (req, res) => {
  const glasses = await Glass.find().sort({ glass: 1 });
  res.json(glasses);
};
