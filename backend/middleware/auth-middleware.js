const JWT = require("jsonwebtoken");

const checkUserAuth = async (req, res, next) => {
    try {
        const check = await JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = check;
        next();
    } catch (error) {
        console.log(error); 
        res.send({
            success:false,
            message: "Invalid token",
            error,
        })

    }
};
module.exports = {checkUserAuth}