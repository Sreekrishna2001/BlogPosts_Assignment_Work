"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BlogpostsSchema extends Schema {
  up() {
    this.create("blogposts", (table) => {
      table.increments();
      table.string("Title");
      table.text("Body");
      table.text("Description");
      table.boolean("isvisible");
      table.timestamps();
    });
  }

  down() {
    this.drop("blogposts");
  }
}

module.exports = BlogpostsSchema;
