const soapConfig = require('config').get('clients.soap');
const { soap: strongSoap } = require('strong-soap');
const { forOwn } = require('lodash');
const {func} = require("joi");
const logger = require('../../utils/logger')('src/loaders/clients/soap.js');

class Soap {
    clientOptions = {};
    soapClient = undefined

    constructor() {
    }

    client() {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.soapClient) {
                    const delay = () => new Promise(async resolve => {
                        return await strongSoap.createClient(soapConfig.get('url'), this.clientOptions, async (err, client) => {
                            return resolve(client)
                        })
                    })

                    return resolve(await delay());
                }

                return resolve(this.soapClient)
            } catch (e) {
                logger.error('Soap connection failed' + e);
                return reject(e);
            }
        });
    }

    parse(result) {
        let results = {}

        forOwn(Object.values(result)[0], function(value, key) {
            if (key !== '$attributes') {
                if (value != null && value.hasOwnProperty('$value')) {
                    results[key] = value['$value'];
                } else {
                    results[key] = value;
                }
            }
        } );

        return results
    }

    async call(client, methodName, args) {
        const method = await client[soapConfig.get("service")][soapConfig.get("port")][methodName]

        return method(args)
    }
}

const soap = new Soap();

module.exports = soap;
