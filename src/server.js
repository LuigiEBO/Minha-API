require("express-async-errors");
const express = require("express");
const migrationRUN = require("./database/sqlite/migrations")
const appError =  require("./utils/appError");
const uploadConfig = require("./configs/upload");
const app = express();
const routes = require("./routes");


app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);
migrationRUN();
app.use((error, request, response, next) => {
  if(error instanceof appError) {
    return response.status(error.statuscode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  })
})
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT} `));