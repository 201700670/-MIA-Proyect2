
const oracledb = require('oracledb');
//oracledb.initOracleClient({configDir: '/opt/oracle/instantclient_19_6'});
connection= ({
    user: 'ANDREITA',
    password:'2797',
    connectString: '172.17.0.2/ORCL18'
    });
//empezremos
async function Open(sql, binds, autoCommit) {
    
    let conn = await oracledb.getConnection(connection);
    console.log('Connected to database', sql);
    let result= await conn.execute(sql, binds, {autoCommit});
    conn.release();
    console.log(result)
    return result;
}

exports.Open=Open;