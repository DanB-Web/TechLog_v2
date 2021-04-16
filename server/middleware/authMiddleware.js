import jwt from 'jsonwebtoken';

//NORMAL AUTH MIDDLEWARE
const protect = (req, res, next) => {
  
  let token;

  //Check for auth header in req
  if (req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')) {

      try {
        //Get token from http auth header and decode info inside jwt token
        token = req.headers.authorization.split(' ')[1]; //Remove 'Bearer' from auth header
        jwt.verify(token, process.env.JWT_SECRET);  //Check token with jwt - will throw error if false
        //Call next middleware on token verification
        next();

        } catch (err) {
          res.status(200);
          throw new Error('Not authorized, token failed');
        }
    }
    //No token in req header
    if (!token) {
      res.status(200);
      throw new Error('Not authorized, no token');
    }
};


//BODY TOKEN MIDDLEWARE
const protectBody = (req, res, next) => {

    let token;

    if (req.body.authorization && 
        req.body.authorization.startsWith('Bearer')) {

      try {
        token = req.body.authorization.split(' ')[1]; //Remove 'Bearer' from auth header
        jwt.verify(token, process.env.JWT_SECRET);
        next();

        } catch (err) {
          res.status(200);
          throw new Error('Not authorized, token failed');
        }
    }
    //No token in req body
    if (!token) {
      res.status(200);
      throw new Error('Not authorized, no token');
    }
}
export { protect, protectBody }