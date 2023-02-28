const express = require("express");
const path = require("path");
const apiRoutes = require("./Develop/routes/apiRoute");
const htmlRoutes = require("./Develop/routes/htmlRoute");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Develop/public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
