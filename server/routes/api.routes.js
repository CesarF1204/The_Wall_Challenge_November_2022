const UserRoutes = require('./users.routes');
const DashboardRoutes = require('./dashboard.routes');
const PostRoutes = require('./posts.routes');
const CommentRoutes = require('./comments.routes');

let APIRoute = (app) => {

    /* users route */
    app.use(UserRoutes);

    /* dashboard route */
    app.use(DashboardRoutes);

    /* post route */
    app.use(PostRoutes);

    /* comment route */
    app.use(CommentRoutes);

}

module.exports = APIRoute;