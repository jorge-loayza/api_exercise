const users = [
  { id: 1, nombre: 'Usuario uno', edad: 20 },
  { id: 2, nombre: 'Usuario dos', edad: 21 },
  { id: 3, nombre: 'Usuario tres', edad: 21 },
  { id: 4, nombre: 'Usuario cuatro', edad: 21 },
  { id: 5, nombre: 'Usuario cinco', edad: 21 },
  { id: 6, nombre: 'Usuario seis', edad: 21 },
  { id: 7, nombre: 'Usuario siete', edad: 21 },
  { id: 8, nombre: 'Usuario ocho', edad: 21 },
  { id: 9, nombre: 'Usuario nueve', edad: 21 },
  { id: 10, nombre: 'Usuario diez', edad: 21 },
  { id: 11, nombre: 'Usuario once', edad: 21 },
  { id: 12, nombre: 'Usuario doce', edad: 21 },
  { id: 13, nombre: 'Usuario trece', edad: 21 },
  { id: 14, nombre: 'Usuario catorce', edad: 21 },
  { id: 15, nombre: 'Usuario quince', edad: 21 },
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
  console.log(req.body)
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
    res.status(200).send({ message: 'Usuario eliminado exitosamente' }); 
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
