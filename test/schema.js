"use strict";
var utils = require("../utils.js");

module.exports = function (knex) {
    return {
        createUsersTable: function () {
            return knex.schema.hasTable("users")
            .then(function(exists) {
                if (!exists) {
                    return knex.schema.createTable("users", function (table) {
                        table.increments("id");
                        table.string("name");
                        table.string("email");
                    });
                }
            });
        },

        /**
         * Insert a game state into the table, if none exists
         */
         /**
        createGameState: function  () {
            return knex("game_state").select("*")
            .then(function (rows) {
                if (rows.length === 0) {
                    return knex("game_state").insert({
                        "id": 1,
                        "timestep": 1,
                        "timestep_interval": 1,
                    });
                }
            });
        },
        **/
    };
};