const { v4: uuidv4 } = require("uuid");

const User = require("../model/user");

const { setUser } = require("../service/auth");

/// signup ...

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  // return res.json({ message: 'User created successfully' });

  return res.render("/");
}

// login page...
async function handleUserlogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  console.log("user", user);

  if (!user)
    return res.render("login", {
      error: "Invalid username or password",
    });
  //// this is use for statefull
  // const sessionId = uuidv4();

  const token = setUser(user);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("uid", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.redirect("/");
  // return res.json({token})
}

module.exports = {
  handleUserSignup,
  handleUserlogin,
};
