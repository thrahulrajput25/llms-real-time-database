const Transaction = require('../models/Transaction');
const { queryLLM } = require('../services/llmService');

exports.getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
};

exports.createTransaction = async (req, res) => {
  const tx = await Transaction.create(req.body);
  const io = req.app.get('socketio');
  io.emit('newTransaction', tx);
  res.status(201).json(tx);
};

// LLM-based: उदाहरण के लिए last N transactions summary
exports.getSummary = async (req, res) => {
  const { count } = req.query; // ?count=5
  const txs = await Transaction.find().sort({ date: -1 }).limit(+count);
  const prompt = `Please summarize these transactions: ${JSON.stringify(txs)}`;
  const summary = await queryLLM(prompt);
  res.json({ summary });
};
