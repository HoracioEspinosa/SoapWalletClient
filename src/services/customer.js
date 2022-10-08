// The `clients` parameter will be inject using the factory associated to `database`
module.exports = soap => {
    const login = async (req) => {
        try {
            const client = await soap.client()
            const {result} = await soap.call(client, 'login', req.body)

            return soap.parse(result)
        } catch (err) {
            return { ok: false, err };
        }
    };

    const create = async (req) => {
        try {
            const client = await soap.client()
            const {result} = await soap.call(client, 'registerCustomer', req.body)

            return soap.parse(result)
        } catch (err) {
            return { ok: false, err };
        }
    };

    const balance = async (req) => {
        try {
            const client = await soap.client()
            const {result} = await soap.call(client, 'checkBalance', req.body)

            return soap.parse(result)
        } catch (err) {
            return { ok: false, err };
        }
    };

    const recharge = async (req) => {
        try {
            const client = await soap.client()
            const {result} = await soap.call(client, 'RechargeWallet', req.body)

            return soap.parse(result)
        } catch (err) {
            return { ok: false, err };
        }
    };

    return {
        login,
        create,
        balance,
        recharge
    };
};

module.exports._inject = ['database'];
