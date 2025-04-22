import express from "express";
import {DATABASE_URL} from "./src/config/index.js"
const app = express();


const start = async () => {
  console.log(DATABASE_URL)
  try {
    // await connect("mongodb+srv://basudevnayak31:OPOgFhSnU8pb1x2x@cluster0.exfu446.mongodb.net/investationTeam?retryWrites=true&w=majority&appName=Cluster0");
    await connect(DATABASE_URL);
    
    // Uncomment this and comment below one if you want to run on ip address so that you can
    // access api in physical device

    app.listen(process.env.PORT || 3000, "0.0.0.0", () =>
    // server.listen(process.env.PORT || 3000, () =>
      console.log(
        `HTTP server is running on port http://localhost:${
          process.env.PORT || 3000
        }`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Subscribe to Arpan Neupane's channel ssssssssss");
});

app.listen(port, () => {
  `Server started on port ${port}`;
});
