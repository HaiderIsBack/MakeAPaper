

const login = (req, res) => {
  res.send("Hello");
}

const register = (req, res) => {
  console.log(req.body)
}

module.exports = {
    login,
    register
}