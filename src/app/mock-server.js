const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Define custom routes if needed
server.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ email: username, password }).value();

  if (user) {
    res.json({ success: true, token: 'yourAuthToken' });
  } else {
    res.json({ success: false, message: 'Authentication failed' });
  }
});

server.post('/check-duplicate', (req, res) => {
  const { email, phoneNumber } = req.body;
  const user = router.db.get('users').find({ email, phoneNumber }).value();

  if (user) {
    res.json({ success: false, message: 'User already exists' });
  } else {
    res.json({ success: true });
  }
});

server.post('/register', (req, res) => {
  const user = req.body;
  const existingUser = router.db.get('users').find({ email: user.email }).value();

  if (existingUser) {
    res.json({ success: false, message: 'User already exists' });
  } else {
    router.db.get('users').push(user).write();
    res.json({ success: true, message: 'Registration successful' });
  }
});

server.use(router);

const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});




