import pandas
import json

df = pandas.read_excel("dictionary.xls")
df.to_json('db.json')
