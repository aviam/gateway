import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import services from './services';
import userApis from './userApis';
import divisions from './divisions';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));
	api.use('/services', services({ config, db }));
	api.use('/userapis', userApis({ config, db }));
	api.use('/divisions', divisions({ config, db }));
	console.log(config);
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
};
