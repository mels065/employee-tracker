class SQL {
    constructor(db) {
        this.db = db;
    }

    async select(table, cols=[]) {
        try {
            return (await this.db.query(
                `SELECT ${cols.length > 0 ? cols.join(', ') : '*'} FROM ${table}`
            ))[0];
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = SQL;
