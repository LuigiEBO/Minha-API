class UsersController {
  async create (request, response) {
  const {name, email} = request.body;

  return response.json({
    name,
    email
  })
 
}
}

module.exports = UsersController