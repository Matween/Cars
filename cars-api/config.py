mysql = {
    'host': 'localhost',
    'user': 'test',
    'port': '3306',
    'passwd': 'test1234',
    'db': 'test'
}

mysqlConfig = 'mysql+pymysql://{}:{}@{}:{}/{}'\
    .format(mysql['user'], mysql['passwd'], mysql['host'], mysql['port'], mysql['db'])
