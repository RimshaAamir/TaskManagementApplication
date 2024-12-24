import mongoose from "mongoose";

const connectDB = async () => {
  // Prevent duplicate connections
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");

    // Connect to MongoDB using the updated syntax
    await mongoose.connect(process.env.MONGO_URI || "", {
      // No need for useNewUrlParser or useUnifiedTopology
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
