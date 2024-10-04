const knex = require("../database/knex")
class NotesController {
  async create (request, response) {
    const {name, description, rating, tags} = request.body;
    const user_id = request.user.id;
    const [ note_id ] = await knex('notes').insert({
      name,
      description,
      rating,
      user_id,
    });
    const tagsInsert = tags.map(name => {
      return {
        name,
        note_id,
        user_id,
      }
    });

    await knex("tags").insert(tagsInsert)
    return response.json('Deu certo')
  }

  async show (request, response) {
    const {id} = resquest.params

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

    return response.json()
  }
  async index (request, response) {
    const { name, tags } = request.query
    const user_id = request.user.id

    let notes
    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim())

      notes = await knex("notes")
        .select(["notes.id", "notes.name", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.name", `%${name}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.name")
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("name", `%${name}%`)
        .orderBy("name")
    }

    const userTags = await knex("tags").where({ user_id })
    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags,
      }
    })

    return response.json(notesWithTags)
}
}
module.exports = NotesController

/*const user_id = request.user.id
    const notes = await knex("notes").where({user_id}).orderBy("name")

    return response.json(notes)
  }*/