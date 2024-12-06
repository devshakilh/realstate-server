export const verifyAdmin = (requiredRoles) => {
    return (req, res, next) => {
      const { role } = req.user; // Assuming role is stored in the user object
  
      if (requiredRoles.includes(role)) {
        return next(); // Allow access if the role matches
      } else {
        return res.status(403).json({ message: "Forbidden: You do not have the necessary permissions." });
      }
    };
  };