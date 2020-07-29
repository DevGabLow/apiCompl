const mysql = require('../connection/mysql');
const { getItems, insertItems } = require('./itemController');

exports.getDelivery = async (req, res, next) => {
    try {
        const result = await mysql.execute(`SELECT 
                                            d.id,
                                            d.name as namePeople,
                                            d.local,
                                            d.hora,
                                            d.status,
                                            d.quantity_order,
                                            d.phone,
                                            i.name as itemName,
                                            i.preco
                                            FROM delivery d
                                            INNER JOIN items i on i.id = d.item_id
                                            WHERE d.is_Enabled = 1 AND d.is_deleted = 0;`);

        const response = result.map(delivery => {
            return {
                id: delivery.id,
                name: delivery.namePeople,
                local: delivery.local,
                hora: delivery.hora,
                status: delivery.status,
                quantidade: delivery.quantity_order,
                phone: delivery.phone,
                nameItem: delivery.itemName,
                preco: delivery.preco
            }
        });
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};


exports.createDelivery = async (req, res, next) => {
    try {
        const query = `INSERT INTO delivery (name,local,phone,hora,status,quantity_order,item_id) VALUES (?,?,?,?,?,?,?);`;
        const result = await mysql.execute(query, [
            req.body.name,
            req.body.local,
            req.body.hora,
            req.body.status,
            req.body.quantity,
            req.body.itemId
        ]);
        const response = {
            name: req.body.name,
            local: req.body.local,
            hora: req.body.hora,
            status: req.body.status,
            quantity: req.body.quantity,
            itemId: req.body.itemId
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.getByIdDelivery = async (req, res, next) => {
    try {
        const query = `SELECT 
                         d.id,
                         d.name,
                         d.local,
                         d.phone,
                         d.hora,
                         d.status,
                         d.is_enabled,
                         d.is_deleted,
                         d.quantity_order,
                         i.name as itemName,
                         i.id as itemId
                       FROM delivery d
                       INNER JOIN items i on i.id = d.item_id
                       where d.id = ?;`;
        const result = await mysql.execute(query, [req.params.id]);
        if (result.length == 0) {
            return res.status(404).send({
                mensagem: 'Não foi encontrado produto com este ID'
            })
        };
        const response = {
            id: result[0].id,
            name: result[0].name,
            local: result[0].local,
            phone: result[0].phone,
            hora: result[0].hora,
            status: result[0].status,
            quantity: result[0].quantity_order,
            enabled: result[0].is_deleted,
            deleted: result[0].is_enabled,
            itemName: result[0].itemName,
            itemId: result[0].itemId

        }
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ errro: error });
    }

};

exports.updateDelivery = async (req, res, next) => {
    try {
        const query = `UPDATE delivery 
        SET name     = ?, 
            local    = ?,
            phone    = ?,
            hora     = ?,
            item_id  = ?
            WHERE
            id       = ?`;
        await mysql.execute(query, [
            req.body.name,
            req.body.local,
            req.body.phone,
            req.body.hora,
            req.body.itemId,
            req.body.id]);
        const response = {
            id: req.body.id,
            name: req.body.name,
            local: req.body.local,
            hora: req.body.hora,
            itemId: req.body.itemId

        }
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error })
    }
}

exports.updateEnabled = async (req, res, next) => {
    try {
        const query = `UPDATE delivery SET is_enabled = ? WHERE id = ?`;
        await mysql.execute(query, [req.body.enabled,req.body.id]);
        const response = {
            id: req.body.id,
            enabled: req.body.enabled
        }
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error});
    }
}

exports.updateDeleted= async (req, res, next) => {
    try {
        const query = `UPDATE  delivery SET is_deleted = ? WHERE id = ?`;
        const result = await mysql.execute(query, [req.body.deleted,req.body.id]);
        const response = {
            id: req.body.id,
            name: result[0].name
        }
        return res.status(201).send(response);
    } catch (error) {
        res.status(500).send({error: error});
    }
}