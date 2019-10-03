from flask import Flask
from flask import request
import json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/vendingMachine"
mongo = PyMongo(app)
@app.route("/additem",methods=["POST"])
def addItems():
    items={}
    items['_id'] = ObjectId()
    items["product"]=request.json["product"]
    items["price"]=request.json["price"]
    items["qty"]=request.json["qty"]
    mongo.db.products.insert(items)
    available=mongo.db.products.find()
    return dumps({"productsAvailable":available})
@app.route("/edititem/<string:productName>",methods=["POST"])
def edititem(productName):
    qty=request.json["qty"]
    price=request.json["price"]
    found=mongo.db.products.update({"product":productName},{"product":productName,"qty":qty,"price":price})
    result=mongo.db.products.find()
    return dumps({"result":result})
@app.route("/delete/<ObjectId:product_id>")
def deleteitem(product_id):
    mongo.db.products.remove({"_id":product_id})
    result=mongo.db.products.find()
    return dumps({"result":result})
@app.route("/show")
def show():
    result=mongo.db.products.find()
    return dumps({"result":result})
    
    



