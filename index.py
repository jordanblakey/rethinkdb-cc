import rethinkdb as r
rdb = r.RethinkDB()

# Connect
rdb.connect('localhost', 28015).repl()


# Create Table
# rdb.db('mydb').table_create('users2').run()

# Insert Data into Table
# rdb.db('mydb').table('users2').insert([
#     {'age': 34, 'city': 'Miami', 'name': 'John Doe'},
#     {'age': 31, 'city': 'Miami', 'name': 'Sarah Doe'},
#     {'age': 27, 'city': 'Dallas', 'name': 'Jean Blue'},
#     {'age': 32, 'city': 'Miami', 'name': 'Stan Doe'}
# ]).run()

# Get data
cursor = rdb.db('mydb').table('users2').run()
for document in cursor:
    print(document)
