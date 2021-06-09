"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Database = use("Database");

Route.get("/", "PostController.index"); //route for getting posts on index page
Route.get("/hiddenposts", "PostController.hidposts"); // route for getting hidden posts
Route.get("/post/new", "PostController.newpost"); //route for getting a page to create new blog posts
Route.post("/post/new", "PostController.insertpost"); // route for creating or adding a post  Create New Post: `URI: post/new`

Route.get("/post/:id", "PostController.getpostbyid"); // route for viewing a  post Show Post: `URI: post/:id

Route.put("/post/:id", "PostController.updatepost"); // route for updating a post  URI: post/:id`

Route.delete("/post/:id", "PostController.delpost"); // route for deleting a post Delete Post: `URI: post/:id
Route.get(
  "/post/:id/changevisibilty/:value",
  "PostController.changevisibility"
); // route for updating visibility of a post (hidden/visible flag)
