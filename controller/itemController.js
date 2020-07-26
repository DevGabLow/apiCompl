const mysql = require('../connection/mysql');

exports.getItems = async (req, res, next) => {
    try {
        const result = await mysql.execute("SELECT * FROM items WHERE is_deleted is false;");
        const response =
            result.map(items => {
                return {
                    id: items.id,
                    name: items.name,
                    quantity: items.quantity,
                    preco: items.preco,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna todos os items'
                    }
                }
            }
            );

        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.insertItems = async (req, res, next) => {
    try {
        const query = 'INSERT INTO items (name,quantity,preco) VALUES (?,?,?);';
        const result = await mysql.execute(query, [
            req.body.name,
            req.body.quantity,
            req.body.preco
        ]);
        const response = {
            message: 'Item inserido com sucesso!',
            itemCriado: {
                id: result.insertId,
                name: req.body.name,
                quantity: req.body.quantity,
                preco: req.body.preco,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos os produtos',
                    url: 'https://localhost:3000/items'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getOneItem = async (req, res, next) => {
    try {
        const query = `SELECT id,name,quantity,preco,is_deleted FROM items WHERE id = ?`;
        const result = await mysql.execute(query, [req.params.id]);
        const response = {
            id: result[0].id,
            name: result[0].name,
            quantity: result[0].quantity,
            preco: result[0].preco,
            deleted: result[0].is_deleted
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.updateItem = async (req, res, next) => {
    try {
        const query = `UPDATE items SET 
                   name = ?, 
                   quantity = ?, 
                   preco = ?
                   WHERE id = ?`;
        const result = await mysql.execute(query,
            [
                req.body.name,
                req.body.quantity,
                req.body.preco,
                req.body.id
            ]);
        const response = {
            id: req.body.id,
            name: req.body.name,
            quantity: req.body.quantity,
            preco: req.body.preco
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.deleteItem = async (req, res, next) => {
    try {
        const query = `UPDATE items SET is_deleted = ?  WHERE id = ?; `;
        const result = await mysql.execute(query, [req.body.deleted,req.body.id]);
        const response = {
            id: req.body.id,
            deleted: req.body.deleted
        }
        return res.status(202).send(response)
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}
