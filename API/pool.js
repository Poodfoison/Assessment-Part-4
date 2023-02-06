import pg from "pg"

const connectDatabase = () => {
    const pool = new pg.Pool({
        user: 'postgres',
        password: '0800',
        database: 'Chat',
        host: 'localhost'
    })   
    return pool
}  

export{ connectDatabase }