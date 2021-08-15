const formatValues = require('../utils/format-values');
const stringifyVal = require('../utils/stringify-val');

class SQL {
    constructor(db) {
        this.db = db;
    }

    async select(table, cols=[]) {
        try {
            return (
                await this.db.query(
                    `SELECT ${cols.length > 0 ? cols.join(', ') : '*'} FROM ${table}`
                )
            )[0];
        } catch (err) {
            console.error(err);
        }
    }

    async insert(table, cols, vals) {
        try {
            return (
                await this.db.query(
                    `INSERT INTO ${table} (${cols.join(', ')}) 
                     VALUES (${formatValues(vals)})`
                )
            )[0];
        } catch (err) {
            console.error(err);
        }
    }

    async update(table, cols, vals, condition) {
        try {
            if (cols.length !== vals.length)
                throw new Error('There must be exactly the same amount of provided columns and values')
            return (
                await this.db.query(
                    `UPDATE ${table}
                    SET ${cols.map((col, i) => `${col} = ${stringifyVal(vals[i])}`).join(', ')}
                    WHERE ${condition}`
                )
            )[0];
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = SQL;
