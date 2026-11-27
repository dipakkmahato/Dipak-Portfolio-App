// import jwt from 'jsonwebtoken'

// const isAuth = (req, res, next)=>{
//     try {
//         const token = req.headers.authorization.split(" ")[1]

//         if(!token){
//             return res.status(401).json({success: false , message: 'unauthorized'})
//         }
//         const decode = jwt.verify(token , process.env.JWT_SECRET)

//         if(!decode) {
//             return res.status(401).json({success: false, message: "unauthorized"});
//         }
//         req.userId = decode.id;
//         next()

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({success: false , message: 'something went wrong'})
//     }
// }
// export default isAuth


import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token missing!',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token!',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token payload!',
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Authentication Error:', error.message);

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token!',
    });
  }
};

export default isAuth;
