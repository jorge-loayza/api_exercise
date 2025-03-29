const users = [
  { id: 1, nombre: 'Usuario uno', edad: 20 },
  { id: 2, nombre: 'Usuario dos', edad: 21 },
];

const getUsers = (req, res) => {
  let filteredUsers = users;

  if (req.query.nombre) {
    filteredUsers = filteredUsers.filter((user) =>
      user.nombre.toLowerCase().includes(req.query.nombre.toLowerCase())
    );
  }

  if (req.query.edad) {
    filteredUsers = filteredUsers.filter(
      (user) => user.edad === parseInt(req.query.edad)
    );
  }

  // const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || 10;
  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;

  // const results = filteredUsers.slice(startIndex, endIndex);

  // res.send({
  //   results,
  //   page,
  //   limit,
  //   total: filteredUsers.length,
  // });

  res.send(filteredUsers);
};

const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Usuario no encontrado' });
  }
};

const createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    nombre: req.body.nombre,
    edad: req.body.edad,
  };

  users.push(newUser);
  res.status(201).send(newUser);
};

const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body, id: userId };
    res.send(users[userIndex]);
  } else {
    res.status(404).send({ message: 'Usuario no encontrado' });
  }
};

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).send({ message: 'Usuario no encontrado' });
  }
};

const createMultipleUsers = (req, res) => {
  const newUsers = req.body;

  if (!Array.isArray(newUsers)) {
    return res
      .status(400)
      .send({ message: 'El body debe ser un array de usuarios' });
  }

  users = [...users, ...newUsers];
  res.status(201).send(newUsers);
};

const deleteAllUsers = (req, res) => {
  users = [];
  res.status(204).send();
};
export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createMultipleUsers,
  deleteAllUsers,
};
