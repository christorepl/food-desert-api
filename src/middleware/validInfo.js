module.exports = function (req, res, next) {
  const { email, user_name, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    if (![email, user_name, password].every(Boolean)) {
      return res.status(401).json({
        msg: "Missing Credentials",
        type: "WARNING",
      });
    } else if (!validEmail(email)) {
      return res.status(401).json({
        msg: "Invalid Email",
        type: "WARNING",
      });
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json({
        msg: "Missing Credentials",
        type: "WARNING",
      });
    } else if (!validEmail(email)) {
      return res.status(401).json({
        msg: "Invalid Email",
        type: "WARNING",
      });
    }
  }

  next();
};
