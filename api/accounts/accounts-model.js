const db = require("../../data/db-config");

const getAll = () => {
 return db("accounts");
};

const getById = (id) => {
 return db("accounts").where("id", id).first();
};

const create = async (account) => {
 const [id] = await db("accounts").insert(account);
 const newAccount = await getById(id);
 return newAccount;
};

const updateById = async (id, account) => {
 await db("accounts").update(account).where("id", id);
 const updated = await getById(id);
 return updated;
};

const deleteById = async (id) => {
 await db("accounts").delete().where("id", id);
 return `The account with id ${id} got nuked!!!`;
};

module.exports = {
 getAll,
 getById,
 create,
 updateById,
 deleteById,
};
