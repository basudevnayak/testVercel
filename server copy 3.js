import express from "express";
import {DATABASE_URL} from "./src/config/index.js";
import {connect} from "./src/config/connect.js";
import cors from 'cors';
import {authRoutes,VariablesRoutes} from "./src/routes/index.js"
const app = express();
app.use(cors());

const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT || 5000, "0.0.0.0", () =>
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', VariablesRoutes);

app.get("/", (req, res) => {
  res.send("basudev");
});

app.listen(port, () => {
  `Server started on port ${port}`;
});
