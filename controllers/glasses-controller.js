import { Glass } from "../models/glass.js";

export const getGlasses = async (req, res) => {
  ///////
  // const [glasses] = await Glass.find();
  // const { glass } = glasses;
  // res.json({ glass });
  ///////
  const glasses = await Glass.find().sort({ glass: 1 });
  res.json(glasses);
};
