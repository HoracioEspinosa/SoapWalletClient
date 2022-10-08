// The `clients` parameter will be inject using the factory associated to `database`
module.exports = soap => {
    const create = async (req) => {
        try {
            const client = await soap.client()
            const {result} = await soap.call(client, 'CreatePayment', req.body)

            return soap.parse(result)
        } catch (err) {
            return { ok: false, err };
        }
    };

    const confirm = async (req) => {
        try {
            const client = await soap.client()
            const {result} = await soap.call(client, 'ConfirmPayment', req.body)

            return soap.parse(result)
        } catch (err) {
            return { ok: false, err };
        }
    };

    return {
        create,
        confirm
    };
};

module.exports._inject = ['database'];
