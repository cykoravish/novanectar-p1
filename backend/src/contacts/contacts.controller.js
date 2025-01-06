import Contacts from "./contacts.model.js";

export const contacts = async (req,res) => {
  try {
    const { fullName, course, city, phoneNumber, email } = req.body;
    if (!fullName || !course || !city || !phoneNumber || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const query = await Contacts.create({
      fullName,
      course,
      city,
      phoneNumber,
      email,
    });
    console.log("query", query);
    return res.status(201).json({ query });
  } catch (error) {
    console.log("error in contacts: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
