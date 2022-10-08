const app = require('express')();
const { forEach } = require('lodash');
/**
 * Middleware
 */
const { global } = require('./middleware');

/**
 * Globals
 */
const logger = require('../src/utils/logger')('src/app.js');


/**
 * Loaders for connecting to the databases
 */
const {
    db: { soap }
} = require('./loaders');


/**
 * App configuration
 */
app.set('DI', require('../src/utils/diContainer'));
app.set('soap', soap);


/**
 * Global middleware
 */
app.use(global());
logger.info('Load global middleware');

/**
 * Register and load dependencies
 */
const diContainer = app.get('DI');
// associate component/dep to a concrete instance
diContainer.register('database', soap);

// DATA - associate component/deps to its factory
diContainer.factory('customer-service', require('./services/customer'));
diContainer.factory('customer-controller', require('./controllers/customer'));

diContainer.factory('payment-service', require('./services/payment'));
diContainer.factory('payment-controller', require('./controllers/payment'));



/**
 * Routers
 */
forEach(require('./routes'), (route, name) => {
    // register route factory
    diContainer.factory(`${name}-route`, route);
    // load component (after injecting dependencies)
    logger.info(`Loading route '/${name}'`);
    app.use(`/${name}`, diContainer.get(`${name}-route`));
});

/**
 * User errorHandler as last middleware to catch errors
 */
app.use(global.errorHandler());

/**
 * Configuration when the server startup
 */
app.on('ready', async () => {
    logger.info('App ready');
});

/**
 * Set specific headers when the server is shutting down
 */
app.on('shutdown', () => {
    app.use(global.shutdown());
    logger.info('Shutting down app');
});

module.exports = app;
