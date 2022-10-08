const httpStatus = require('http-status-codes');

// The `service` parameter will be inject using the factory associated to `data-service`
module.exports = service => {
    const login = async (req, res) => {
        const result = await service.login(req)
        res.status(httpStatus.OK).json(result);
    };

    const create = async (req, res) => {
        const result = await service.create(req)
        res.status(httpStatus.OK).json(result);
    };

    const balance = async (req, res) => {
        const result = await service.balance(req)
        res.status(httpStatus.OK).json(result);
    };

    const recharge = async (req, res) => {
        const result = await service.recharge(req)
        res.status(httpStatus.OK).json(result);
    };

    return {
        login,
        create,
        balance,
        recharge
    };
};


module.exports._inject = ['customer-service'];
