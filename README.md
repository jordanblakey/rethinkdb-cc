# RethinkDB Crash Course

RethinkDB pushes JSON to your apps in realtime.

When your app polls for data, it becomes slow, unscalable, and cumbersome to maintain.

RethinkDB is the open-source, scalable database that makes building realtime apps dramatically easier.

## ReQL

```sh
brew update; brew install rethinkdb # Installs the server executable
rethinkdb # Start the RethinkDB server on port localhost:8080
```

Running the executable will create a new data store in the `cwd`
From `localhost:8080` > Data Explorer

## All functions

### Top Level Functions

```md
r.<function>
branch | dbCreate | do | expr | http | json | now | polygon | row | uuid | args | circle | dbDrop | epochTime | geojson | info | line | object | random | time | wait | binary | db | dbList | error | grant | js | literal | point | range | typeOf
```

### Database Functions

```md
r.db(<name>)<function>
do | grant | info | table | tableCreate | tableDrop | tableList | typeOf
```

### Table Functions

```md
r.db(<name>).table(<name>)<function>
avg | between | bracket | changes | coerceTo | concatMap | config | contains | count | default | delete | distinct | do eqJoin | filter | fold | forEach | get | getAll | getField | getIntersecting | getNearest | grant | group | hasFIelds | includes | indexCreate | indexDrop | indexList | indexRename | indexStatus | indexWait | info | innerJoin | insert | intersects | isEmpty | limit | map | max | merge | min | nth | offsetsOf | orderBy | outerJoin | pluck | rebalance | reconfigure | reduce | replace | sample | skip | slice | status | sum | sync | typeOf | union | update | wait | withFields | without | zip
```

## Queries by Use Case

```js
// CREATE DB AND TABLES
r.dbList() // List all databases on the current server
r.dbCreate('mydb') // Create a new database 'mydb'
r.dbDrop('mydb') // Drop database 'mydb'
r.db('mydb') // Use database 'mydb'
r.db('mydb').tableCreate('users') // Create table 'users' in db 'mydb'
r.db('mydb') // Get info on a table, db, etc.
  .table('users')
  .info()

// INSERTING RECORDS INTO A TABLE
// Insert a single record in table 'users'
r.db('mydb')
  .table('users')
  .insert({
    name: 'Jean Blue',
    city: 'Dallas',
    age: 27
  })

// Insert multiple records using an array
r.db('mydb')
  .table('users')
  .insert([
    { name: 'John Doe', city: 'Miami', age: 34 },
    { name: 'Sarah Doe', city: 'Miami', age: 31 },
    { name: 'Stan Doe', city: 'Miami', age: 32 }
  ])

// QUERYING A TABLE
// Query all records from table 'users'
r.db('mydb').table('users')

// Filter on the value of a key or set of keys
r.db('mydb')
  .table('users')
  .filter({
    city: 'Dallas'
  })

// Select only specific keys from the results
r.db('mydb')
  .table('users')
  .pluck(['name', 'age'])

// Order results by a specific key
r.db('mydb')
  .table('users')
  .orderBy(r.asc('name'))

r.db('mydb')
  .table('users')
  .orderBy(r.desc('age'))

// Limit the number of records returned
r.db('mydb')
  .table('users')
  .limit(2)

// Count the records returned
r.db('mydb')
  .table('users')
  .count()

// Get distinct values for a key
r.db('mydb')
  .table('users')
  .pluck('city')
  .distinct()

// Filter by comparison operator on a key
r.db('mydb')
  .table('users')
  .filter(r.row('age').lt(30))

r.db('mydb')
  .table('users')
  .filter(r.row('age').le(30))

r.db('mydb')
  .table('users')
  .filter(r.row('age').ge(30))

r.db('mydb')
  .table('users')
  .filter(r.row('age').gt(31))

// Update one or more records
r.db('mydb')
  .table('users')
  .filter({
    id: 'aa2db26c-3363-499a-8bdf-90fc2bc77e28'
  })
  .update({
    city: 'San Jose'
  })
```

### Working with Foreign Keys and Joins

```js
r.db('mydb').tableCreate('tasks') // Create new table 'tasks'
r.db('mydb').tableList() // List all tables in the DB
// Create multiple new records with a matching id to a record in the 'users' table, to serve as a foreign key
r.db('mydb')
  .table('tasks')
  .insert([
    { user_id: '22086d8e-9da0-4e24-adc7-e715eb73424b', text: 'Task 1' },
    { user_id: '22086d8e-9da0-4e24-adc7-e715eb73424b', text: 'Task 2' },
    { user_id: '22086d8e-9da0-4e24-adc7-e715eb73424b', text: 'Task 3' }
  ])

// eqJoin 'tasks' and 'users' on key 'user_id', showing left and right tables
r.db('mydb')
  .table('tasks')
  .eqJoin('user_id', r.db('mydb').table('users'))

// eqJoin as above, but zip the left and right tables, overwriting from the joined table
r.db('mydb')
  .table('tasks')
  .eqJoin('user_id', r.db('mydb').table('users'))
  .zip()
```

## Using RethinkDB with Python

```sh
pip3 install pipenv # Install pipenv virtual environment manager
pipenv install rethinkdb # Create a virtual environment in cwd, with dep rethinkdb
pipenv shell # Activate the virtualenv
touch index.py

```
