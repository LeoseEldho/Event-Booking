import mongoose from "mongoose";

const DataBaseConnection = async () => {
  try {
    const Data = await mongoose.connect(process.env.MONGOOSE_CONNECTION);
    if (Data) console.log("DataBase Connected Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default DataBaseConnection;
