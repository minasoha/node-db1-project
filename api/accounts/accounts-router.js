const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
 checkAccountId,
 checkAccountNameUnique,
 checkAccountPayload,
} = require("./accounts-middleware");
router.get("/", async (req, res, next) => {
 try {
  const data = await Accounts.getAll();
  res.json(data);
 } catch (err) {
  next(err);
 }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
 const { id } = req.params;
 try {
  const account = await Accounts.getById(id);
  res.json(account);
 } catch (err) {
  next(err);
 }
});

router.post(
 "/",
 checkAccountPayload,
 checkAccountNameUnique,
 async (req, res, next) => {
  try {
   const newAccount = await Accounts.create(req.body);
   res.status(201).json(newAccount);
  } catch (err) {
   next(err);
  }
 },
);

router.put(
 "/:id",
 checkAccountPayload,
 checkAccountNameUnique,
 checkAccountId,
 async (req, res, next) => {
  try {
   const updated = await Accounts.updateById(req.params.id, req.body);
   res.json(updated);
  } catch (err) {
   next(err);
  }
 },
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
 try {
  const deleted = await Accounts.deleteById(req.params.id);
  res.json(deleted);
 } catch (err) {
  next(err);
 }
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
 res.status(err.status || 500).json({
  message: err.message,
  stack: err.stack,
 });
});

module.exports = router;
