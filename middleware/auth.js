const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const authorizationHeaderValue = req.cookies?.token;
  const tokenFromCookie = req.cookies.uid;
  req.user = null;

  let token = null;

  // Check Authorization header first
  if (
    authorizationHeaderValue &&
    authorizationHeaderValue.startsWith("Bearer")
  ) {
    token = authorizationHeaderValue.split(" ")[1];
  }
  // Fall back to cookie
  else if (tokenFromCookie) {
    token = tokenFromCookie;
  }

  if (token) {
    const user = getUser(token);
    req.user = user;
  }

  return next();
}

function restictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("unauthorized");

    next();
  };
}

module.exports = {
  checkForAuthentication,
  restictTo,
};
