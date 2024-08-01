const knex = require("../database/knex")
class NotesController {
  async create (request, response) {
    const {name, description, rating, tags} = request.body;
    const {user_id} = request.params;

    const {note_id} = await knex('notes').insert({
      name,
      description,
      rating,
      user_id
    })
    const tagsInsert = tags.map(name => {
      return {
        name,
        note_id,
        user_id,
      }
    });
    await knex("tags").insert(tagsInsert)
    response.json('Deu certo')
  }

  async show (request, response) {
    const {id} = request.params;

    const note = await knex('notes').where({id}).first();
    const tags = await knex('tags').where({note_id: id}).orderBy("name");

    return response.json({
      ...note,
      tags
    });
  }

  async delete (request, response) {
    const {id} = request.params;

    await knex("notes").where({id}).delete();

    response.json()
  }
}
module.exports = NotesController