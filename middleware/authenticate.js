import JWT from "jsonwebtoken";
export const authenticate = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Token is required" })
        }
        JWT.verify(token, process.env.JWT_SEcurity_key, (error, decodedUser) => {
            if (error) {
                return res.status(403).json({ message: `Invalid or expired token  ${error}` })
            }
            req.user = decodedUser;
            console.log(req.user);
            next();
        })
    } catch (err) {
        return res.status(500).json({ message: `Some thing wrong ${err}` })
    }
}