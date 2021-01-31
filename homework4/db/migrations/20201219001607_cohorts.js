
exports.up = function(knex) {
  
    return knex.schema.createTable('cohorts',table=>{
        table.increments('id');
        table.string('name');
        table.string('members',1000); //varchar 1000
        table.string('logo_url');
    })
};

exports.down = function(knex) {
  
    return knex.schema.dropTable('cohorts');
};
