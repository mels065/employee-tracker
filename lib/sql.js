const formatValues = require('../utils/format-values');
const stringifyVal = require('../utils/stringify-val');
const columnSelect = require('../utils/column-select');

class SQL {
    constructor(db) {
        this.db = db;
    }

    async select(table, cols=[], opts={}) {
        try {
            return (
                await this.db.query(
                    `SELECT ${columnSelect(cols)} FROM ${table}
                    ${opts.joins ? opts.joins.map(({ type, table, on, as }) => `${type ? type : ''} JOIN ${table} ${as ? `AS ${as}` : ''} ON ${on}`).join('\n') : ''}
                    ${opts.where ? `WHERE ${opts.where}` : ''}
                    ${opts.orderBy ? `ORDER BY ${opts.orderBy}` : ''}`
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

    async delete(table, condition) {
        try {
            return (
                await this.db.query(
                    `DELETE FROM ${table} WHERE ${condition}`
                )
            )[0]
        } catch (err) {
            console.error(err);
        }
    }

    async end() {
        await this.db.end();
        delete this;
    }
}

module.exports = SQL;
