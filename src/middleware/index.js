'use strict';
import { Router } from 'express';
import {gatByName} from '../models/userApis';
import {db} from '../connect/firebase';
import axios from 'axios';

export default ({ config, db }) => {
	let routes = Router();

	routes.get('/middle/gate', (req, res) => {
        console.log(req.query);
        const url = parseQuery(req.query);
        return axios.get(url).then((response) => {
            return res.json(response.data);
        }).catch((error) => console.log(error));
    });
    // add middleware here

    routes.get('/middle/snapi/:id', (req, res) => {
        const results = [];
        gatByName(db, req.params.id).then((userApi) => {
            parseMultiApi(userApi, res);
            // userApi.map((serviceApi) => {
            //     serviceApi.services_apis.map((service) => {
            //         service.apis.map((api) => {
            //             axios.get(`http://${service.base}${api}`).then((response) => {
            //                 results[api] = response;
            //                 console.log(response);
            //             }).catch((error) => console.log(error));
            //         });
            //     });
            // });
            // res.json(results);
        });

    });

	return routes;
};

function parseQuery (params) {
    if (params.host) {
        return 'http://'+params.host+params.basePath+params.path;
    }
}

function parseMultiApi(userApi, res) {
    const results = {};
    userApi.map((serviceApi) => {
        serviceApi.services_apis.map((service ,sapiindex) => {
            service.apis.map((api, apiindex) => {
                get(service, api).then((r) => {
                    results[api] = r;
                    console.log(r);
                    if(sapiindex === serviceApi.services_apis.length -1 && apiindex === service.apis.length - 1 ) {
                        res.json(results);
                    }

                });
            });
        });
    });
    // console.log(results);
    // return results;
}

function get(service, api) {
    return axios.get(`http://${service.base}${api}`).then((response) => {
        return response.data;
    }).catch((error) => console.log(error));
}