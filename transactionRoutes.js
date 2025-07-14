const router = require('express').Router();
const {
  getAllTransactions,
  createTransaction,
  getSummary
} = require('../controllers/transactionController');

router.get('/', getAllTransactions);
router.post('/', createTransaction);
router.get('/summary', getSummary);

module.exports = router;
