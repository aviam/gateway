import resource from 'resource-router-middleware';
import {all, createNew} from '../models/services';

export default ({ config, db }) => resource({

    /** Property name to store preloaded entity on `request`. */
    id : 'services',

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */

    /** GET / - List all entities */
    index({ params }, res) {
        all(db).then((services) => {
            res.json(services);
        });
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
        createNew(db, body).then((id) => {
            res.json(id);
        });
    },
});
