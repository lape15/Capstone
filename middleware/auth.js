const jwt = require ('jsonwebtoken');

module.exports = function (req,res,next)  {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      if (verified.role !== 'admin') {
        return res.status(400).send('Token Invalid');
      }
      next();
    } catch (error) {
      res.status(400).send('Token Invalid');
    }
}