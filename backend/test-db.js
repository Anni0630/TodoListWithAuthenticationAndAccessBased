const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'ankitha123', // Update this
    database: 'TodoList',
});

console.log('Attempting to connect with:', {
    host: client.host,
    port: client.port,
    user: client.user,
    database: client.database,
});

client.connect()
    .then(() => {
        console.log('✅ Successfully connected!');
        client.end();
    })
    .catch(err => {
        console.error('❌ Connection failed!');
        console.error('Error Code:', err.code);
        console.error('Error Message:', err.message);
        console.log('\n💡 Tip: Try running this command in your terminal to see if it works there:');
        console.log(`psql -h 127.0.0.1 -U postgres -d TodoList`);
        process.exit(1);
    });
