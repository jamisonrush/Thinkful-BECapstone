const path = require("path");

module.exports = {
  development: {
    client: "postgresql",
    connection: "postgres://vryvguwd:aOQxhsOESGDOYZTk19ZE-1CgHZ1ekZ7b@drona.db.elephantsql.com/vryvguwd",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: "postgres://vryvguwd:aOQxhsOESGDOYZTk19ZE-1CgHZ1ekZ7b@drona.db.elephantsql.com/vryvguwd",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
