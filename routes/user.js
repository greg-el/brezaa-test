const signup = `INSERT INTO users(
    email,
    password,
    username,
    first_name,
    last_name,
    address,
    type_of_user,
    profession,
    longitude,
    latitude)
  VALUES(
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
    ) RETURNING *`;

const createUser = (request, response) => {
  async () => {
    const client = await pool.connect();
    const data = [
      request.body.email,
      request.body.password,
      request.body.username,
      request.body.first_name,
      request.body.last_name,
      request.body.address,
      request.body.type_of_user,
      request.body.profession,
      request.body.longitude,
      request.body.latitude,
    ];
    client.query(signup, data, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.user_id}`);
    });
  };
};

const getUsers = (request, response) => {
  (async function () {
    const client = await db.pool.connect();
    client.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json({ hi: "hello" });
    });
    client.release();
  })();
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
