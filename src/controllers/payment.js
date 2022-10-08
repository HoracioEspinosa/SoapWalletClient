const httpStatus = require('http-status-codes');

// The `service` parameter will be inject using the factory associated to `data-service`
module.exports = service => {
    const create = async (req, res) => {
        const result = await service.create(req)
        res.status(httpStatus.OK).json(result);
    };

    const confirm = async (req, res) => {
        const result = await service.confirm(req)
        res.status(httpStatus.OK).json(result);
    };

    return {
        create,
        confirm
    };
};


module.exports._inject = ['payment-service'];
