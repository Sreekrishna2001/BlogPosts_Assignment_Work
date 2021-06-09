"use strict";
const blogposts = use("App/Models/Blogpost");
class PostController {
  async index({ view }) {
    const posts = await blogposts.query().where("isvisible", 1).fetch(); //fetching visible posts for default index view
    return view.render("index", { posts: posts.toJSON() });
  }
  async hidposts({ view }) {
    const posts = await blogposts.query().where("isvisible", 0).fetch(); //fetching hidden posts for hiddenposts  view

    return view.render("hidindex", { posts: posts.toJSON() });
  }
  async newpost({ view }) {
    return view.render("createpost"); //rendering view for creating a new blog post
  }
  async insertpost({ view, request, response }) {
    var flag = false;
    if (request.post().flag == "0") {
      flag = true;
    } else {
      flag = false;
    }
    const blogpost = new blogposts();
    blogpost.title = request.post().in;
    blogpost.body = request.post().tar;
    blogpost.description = request.post().des;
    blogpost.isvisible = !flag; // setting the isvisible flag based on draft post or complete post
    await blogpost.save(); //Saving newly created post to database
    return response.redirect("/");
  }
  async getpostbyid({ params, view }) {
    let rp = await blogposts.find(params.id); //fetching the post based on param id from database and sending it to view
    // console.log(rp.toJSON());
    var tem = rp.toJSON();
    tem.Body = tem.Body ? tem.Body.replace(/</g, "0001") : null;
    tem.Body = tem.Body ? tem.Body.replace(/>/g, "1110") : null;
    tem.Body = tem.Body ? tem.Body.replace(/\n/g, "") : null;
    tem.Body = tem.Body ? tem.Body.replace(/\r/g, "") : null;
    return view.render("viewpost", { post: tem });
  }

  async updatepost({ params, view, request, response }) {
    let upost = await blogposts.find(params.id);
    upost.Title = request.post().Title;
    upost.Description = request.post().Description;
    upost.Body = request.post().Body;
    await upost.save(); // updating the existing blog post based  on params id
    return response.redirect("/"); //redirecting to home page
  }

  async delpost({ params, response }) {
    let dpos = await blogposts.find(params.id); //deleting the blog post based on params id
    await dpos.delete();
    return response.redirect("/"); //redirecting to home page
  }
  async changevisibility({ params, response }) {
    let vpos = await blogposts.find(params.id);
    vpos.isvisible = params.value == "true" ? true : false; //changing the visiblity of the post ie:changing isvisible flag
    await vpos.save();
    return response.redirect("/"); //redirecting to home page
  }
}

module.exports = PostController;
