import { Query } from "./query.model.js";

const queryForm = async (req, res) => {
  console.log("test 1 in queryForm");
  try {
    const { fullName, phoneNumber, email } = req.body;
    console.log("req.body", fullName, phoneNumber, email);
    if (!fullName || !phoneNumber || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const query = await Query.create({ fullName, phoneNumber, email });
    console.log("query", query);
    return res.status(201).json({ query });
  } catch (error) {
    console.log("error in queryForm", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { queryForm };
