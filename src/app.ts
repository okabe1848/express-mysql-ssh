import express from 'express';

const mysqlssh = require('mysql-ssh');
const fs = require('fs');
const cors = require('cors');
const app = express();
const env = require('../env.json');

app.use(cors());

const port = 3000;
let dbClient = null;

app.listen(port, async () => {
    const config = env[`conf_${env.conf_key}`];
    dbClient = await mysqlssh.connect(createSshConfig(config), createDbConfig(config));
    return console.log(`server is listening on ${port}`);
}).on('error', (err: any) => {
    console.log(err);
});

app.get('/code', async (req, res) => {
    const code = await getTransactionCode();
    res.send(`${code}`);
});

const createSshConfig = (config) => {
    return {
        host: config.sshHost,
        user: config.sshUser,
        privateKey: fs.readFileSync(config.sshPrivateKeyPath),
    };
};

const createDbConfig = (config) => {
    return {
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.db,
    };
};

const getTransactionCode = async () => {
    return new Promise((resolve, reject) => {
        dbClient.execute('select * from transactions order by id desc', function (err, results, fields) {
            if (err) reject(err);
            else resolve(results[0].additional_data);
        });
    });
};

process.on('exit', function () {
    console.log('Exitting...');
    mysqlssh.close();
});

process.on('SIGINT', function () {
    console.log('SIGINT...');
    process.exit(0);
});
