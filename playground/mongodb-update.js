const { MongoClient, ObjectID }=require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
  if(err){
    return(console.log('Unable to connect to db'));
  }
  console.log('Successfully connect to db');
  var db = client.db('TodoApp2');

  //findOneAndUpdate
  // see Node JS MongoDB api for findOneAndUpdate method.
  //findOneAndUpdate method requires these parameters: findOneAndUpdate({filter},{operator},{option},callback)
  // db.collection('Todos2').findOneAndUpdate({
  //   _id:new ObjectID("5a43037ab358fa38d5dc14fa")
  // },{
  //   $set:{
  //     text:"I am changing this text"
  //   }
  // },{
  //   returnOriginal:false
  // }).then((result)=>{
  //   console.log(result);
  // });

  //challenge
  db.collection('Users').findOneAndUpdate({
    _id:new ObjectID("5a4342e0b358fa38d5dc2094")
  },{
    $set:{
          name:"Renata Widjaja",
          location:"San Diego"
        },
    $inc:{
          age:2
        }
  },{
    returnOriginal:false
  }).then((res)=>{console.log(res)});
});
