module.exports = {
    type: "postgres",
    port: 6432,
    username: "test",
    password: "test",
    database: "test",
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    factories: ["dist/**/database/factories/**/*.js"],
    seeds: ["dist/**/database/seeds/**/*.js"],
  }