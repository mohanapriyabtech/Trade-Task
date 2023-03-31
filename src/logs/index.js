
import Sequelize from 'sequelize';


/**
 * 
 */
export const bootLogs = async () => {
    
}

const config = {
    "username": "root",
    "password": null,
    "database": "logsDB",
    "host": "localhost",
    "dialect": "sqlite",
    "logging": false,
    "storage": `./src/logs/db.sqlite`
};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const RequestLog = sequelize.define("requestLogs", {
    url:{
        type : Sequelize.CHAR(16),
        allowNull : false,
    }, 
    method: Sequelize.CHAR(5),
},{
    timestamps: true
});

RequestLog.sync({force: false, logging:true});

/**
 * 
 * @param {*} data 
 * @returns 
 */
export const requestLog = (data) => {
    return RequestLog.create({
        url: data.url,
        method: data.method
    });
}

/**
 * 
 * @returns 
 */
export const requestLogs = () => {
    return RequestLog.findAll();
}