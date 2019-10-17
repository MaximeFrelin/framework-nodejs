export default {
    db: {
        connectionString: "postgres://postgres:localpgadmin@localhost:5432/authentification"
    },
    cache: {
        enable: true,
        duration: 36000, //milliseconds
        checkDelay: 5000 //milliseconds
    },
    authentification: {
        useCache: true
    },
    debug: false
}