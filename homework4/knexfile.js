// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'team',
      username:'betsy',
      password:'Welcome@1234'
    },

    migrations:{
      tableName:'migrations',
      directory: './db/migrations'
    },
    seeds:{
      directory:'./db/seeds'
    }
  },

  
};
