const {DATABASE} = require('../../../config/constants');
const mysql = require('mysql');

class DatabaseModel {
    constructor(){
        this.connection = mysql.createConnection(DATABASE);
    }
    query(statement){
        return new Promise((resolve, reject) => {
            this.connection.query(statement, function(err, result){
                if(err){
                    return reject(err);
                }
                else{
                    return resolve(result);
                }
            });
        });
    }
}

module.exports = DatabaseModel;