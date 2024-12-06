import prisma from "../lib/prisma";

export const adminMiddleware = async (req, res, next) => {
  const tokenUserId = req.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: tokenUserId },
    });

    // Check if user is admin
    if (user && user.isAdmin) {
      next(); // Allow the request to proceed if the user is an admin
    } else {
      return res.status(403).json({ message: "Not Authorized!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to verify admin status!" });
  }
};
