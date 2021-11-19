module.exports = (req, res, next) => {
  req.context = {}
  const { query } = req;
  req.context.page = query.page ? parseInt(query.page) : 1
  req.context.limit = query.limit ? parseInt(query.limit) : 3
  req.context.skip = (req.context.page - 1) * req.context.limit
  req.context.searchTerm = query.q || ''
  req.context.search = new RegExp(req.context.searchTerm, 'gi')
  next()
};
