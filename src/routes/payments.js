const router = require('express').Router();
const logger = require('../utils/logger')('src/routes/payments.js');

module.exports = controller => {
    router.use((req, res, next) => {
        logger.network(
            `Received request for payment: ${req.method} ${req.baseUrl}${req.path}`
        );
        next();
    });

    router.post('', controller.create);

    router.post('/confirm', controller.confirm);

    router.get('/health', (req, res, next) =>
        res.json({ message: 'OK' }).end()
    );

    return router;
};

module.exports._inject = ['payment-controller'];
