const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, '6ce10de12a7ea5908ae2c2007e4dece1abd6f3402ca3e115cdb17b5806a507897cf67b23676642a5d264c3deb57286580b985136577eac58dd0360e849e4fba8');
        req.body.userId = decoded.userId;
        next();
    }catch (e) {
        res.status(401).send({
            message: 'Not authenticated with this token',
            success: false,
            data: e,
        })
    }
}