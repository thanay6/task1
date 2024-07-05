import JWT from "jsonwebtoken";

//function to middleware

export const authenticate = (req,res, next) =>{

    const token = req.header("auth-token");
    if(!token) return res.status(401).json({
        message : "Access denied. No token provided",
        sol: "provide token"
    });

    try { 

        const verified = JWT.verify(token, process.env.JWT_SECRET);
        req.admin = verified;
        next();
    }catch (err){
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Login expired, please login again." });
        }
        res.status(400).json({ message: "Invalid Token" });
    }
}


export const validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    };
  };