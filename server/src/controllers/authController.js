// This file will contain the logic to sync Firebase users with MongoDB.
import User from "../models/User.js";
// Imports the MongoDB User model we created in step 2.

export const syncUser = async (req, res) => {
  // Creates and exports the synchronization function.

  try {
    const { uid, email, name } = req.user;
    // Pulls out the unique ID, email, and name from the secure 'req.user' object that our middleware attached.

    let user = await User.findOne({ firebaseUid: uid });
    // Asks MongoDB to search the database for a user that has this specific Google ID.

    if (!user) {
      // If MongoDB returns null, it means this user has never logged in before.

      user = await User.create({
        firebaseUid: uid,
        email: email,
        name: name || "",
      });
      // Creates a brand new document in MongoDB for them using their Google data. All the target Calories/Macros will fall back to their defaults.
    }

    res.status(200).json({ status: "success", data: user });
    // Sends a successful HTTP 200 response back to the React app, packed with the user's MongoDB profile data.
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
    // If the database crashes, catch the error and send a 500 Server Error response.
  }
};
