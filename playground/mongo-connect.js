//const MongoClient = require('mongodb').MongoClient;
const{MongoClient , ObjectID}= require('mongodb');


MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Successfully connect to MongoDB server');

  //var db = client.db('TodoApp2');
  // db.collection('Todos2').insertOne({
  //   text:'Something to do',
  //   completed:false
  // }, (err, result)=>{
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // });
  // db.collection('Users').insertOne({
  //   name:"Ari",
  //   age:33,
  //   location:"San Diego"
  // }, (err,result)=>{
  //   if(err){return console.log('Unable to insert to Users')}
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp()))
  // })

  client.close();

})
