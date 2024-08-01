const express = require("express");
const appError =  require("./utils/appError");
const app = express();
const routes = require("./routes")


app.use(express.json());
app.use(routes)
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