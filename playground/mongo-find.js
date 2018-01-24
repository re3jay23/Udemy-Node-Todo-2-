const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
  if(err){
    return console.log('Unable to connect to db')
  }
  console.log('Successfully connected');

  var db = client.db('TodoApp2');
  // db.collection('Todos2').find({_id:new ObjectID ("5a4272d7a6eec807f44cee9c")}).toArray().then((docs)=>{
  //   console.log('Todos2');
  //   console.log(JSON.stringify(docs, undefined,2))
  // },(err)=>{
  //   console.log('Unable to fetch todos')
  // });
  // db.collection('Todos2').find({
  //   completed:true
  // }).count().then((count)=>{
  //   console.log(`Todos count:${count}` )
  // },(err)=>{
  //   console.log('Unable to fetch todo', err);
  // })

  db.collection('Users').find({
    name:"Adi"
  }).count().then((count)=>{
    console.log(`Number of users with name adi is: ${count}`);
  },(err)=>{
    console.log('Unable to fetch users',err);
  })

  db.collection('Users').find({name:'Adi'}).toArray().then((docs)=>{
    console.log(JSON.stringify(docs, undefined, 2))
  })

});
