import resource from 'resource-router-middleware';
import {all, createNew, gatByName} from '../models/divisions';

export default ({ config, db }) => resource({

    /** Property name to store preloaded entity on `request`. */
    id : 'divisions',

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */

    /** GET / - List all entities */
    index({ params }, res) {
        all(db).then((divisions) => {
            res.json(divisions);
        });
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
        createNew(db, body).then((id) => {
            res.json(id);
        });
    },

    read(req, res) {
        console.log(req.params);
        gatByName(db, req.params.user_apis).then((apiDate) => {
            res.json(apiDate);
        });
    },
});