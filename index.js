const r = require('rethinkdb')

r.connect(
  {
    host: 'localhost',
    port: 28015,
    db: 'mydb'
  },
  (err, conn) => {
    if (err) throw err
    // createTable(conn, 'users3')
    // addUsers(conn)
    getUsers(conn)
  }
)

function createTable(conn, tableName) {
  r.tableCreate(tableName).run(conn, (err, res) => {
    if (err) throw err
    console.log(JSON.stringify(res))
  })
}

function addUsers(conn) {
  const users = [
    { age: 34, city: 'Miami', name: 'John Doe' },
    { age: 31, city: 'Miami', name: 'Sarah Doe' },
    { age: 27, city: 'Dallas', name: 'Jean Blue' },
    { age: 32, city: 'Miami', name: 'Stan Doe' }
  ]

  r.table('users3')
    .insert(users)
    .run(conn, (err, res) => {
      console.log(JSON.parse(JSON.stringify(res)))
    })
}

function getUsers(conn) {
  r.table('users3').run(conn, (err, cursor) => [
    cursor.toArray((err, res) => {
      // console.log(JSON.parse(JSON.stringify(res)))
      // console.log(Array.isArray(res))
      // console.log(res === Object(res))
      console.log(res)
    })
  ])
}
