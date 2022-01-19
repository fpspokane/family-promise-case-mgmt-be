exports.up = function (knex) {
  return knex.schema
    .createTable('locations', (t) => {
      t.increments('ID').notNullable().unique().primary();
      t.integer('household_id').notNullable();
      t.string('type');
      t.string('name');
      t.string('latlong');
      t.string('address1');
      t.string('address2');
      t.string('city');
      t.string('state');
      t.string('zip');
      t.timestamp('deleted_at').defaultTo(knex.fn.now());
      t.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('households', (t) => {
      t.increments('ID').notNullable().unique().primary();
      t.string('name').notNullable();
      t.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('clients', (t) => {
      t.increments('ID').notNullable().unique().primary();
      t.integer('household_id').notNullable();
      t.string('first_name').notNullable();
      t.string('last_name').notNullable();
      t.string('ssn').notNullable();
      t.boolean('is_hoh');
      t.string('relation');
      t.string('education_level');
      t.integer('gender_id');
      t.integer('race_id');
      t.integer('ethnicity_id');
      t.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('genders', (t) => {
      t.increments('ID').notNullable().unique().primary();
      t.string('name').notNullable().unique();
    })
    .createTable('races', (t) => {
      t.increments('ID').notNullable().unique().primary();
      t.string('name').notNullable().unique();
    })
    .createTable('ethnicities', (t) => {
      t.increments('ID').notNullable().unique().primary();
      t.string('name').notNullable().unique();
    })
    .createTable('phone_numbers', (t) => {
      t.increments('ID').notNullable().unique().primary();
      t.integer('client_id').notNullable();
      t.string('number').notNullable().unique();
      t.string('phone_type');
      t.timestamp('deleted_at').defaultTo(knex.fn.now());
      t.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('email_addresses', (t) => {
      t.increments('ID').notNullable().unique().primary();
      t.integer('client_id').notNullable();
      t.string('email').notNullable().unique();
      t.string('email_type');
      t.boolean('allow_sms');
      t.timestamp('deleted_at').defaultTo(knex.fn.now());
      t.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('education_histories', (t) => {
      t.increments('ID').notNullable().unique().primary();
      t.integer('client_id').notNullable();
      t.string('school_name');
      t.string('level');
      t.date('start_date');
      t.date('end_date');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('education_histories')
    .dropTableIfExists('email_addresses')
    .dropTableIfExists('phone_numbers')
    .dropTableIfExists('ethnicities')
    .dropTableIfExists('races')
    .dropTableIfExists('genders')
    .dropTableIfExists('clients')
    .dropTableIfExists('households')
    .dropTableIfExists('locations');
};
