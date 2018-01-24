const { MongoClient, ObjectID }= require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
  if(err){
    return(console.log('Unable to connect to db'));
  }
  console.log('Successfully connect to db')
  var db = client.db('TodoApp2');

  //deleteMany
  // db.collection('Todos2').deleteMany({completed:false}).then((result)=>{
  //   console.log('number of deleted documents: ',result.result.n);
  // })

  //deleteOne
  // db.collection('Todos2').deleteOne({completed:false}).then((result)=>{
  //   console.log('number of deleted documents:'result.result.n);
  // })

  //findOne and delete
  // db.collection('Todos2').findOneAndDelete({completed:false}).then((result)=>{
  //   console.log('id to be deleted: ',result.value._id)
  // })

  //challenges
  // db.collection('Users').deleteMany({name:'Adi'}).then((result)=>{
  //   console.log('Number of documents found',result.result.n);
  // });
  db.collection('Users').findOneAndDelete({_id:new ObjectID('5a434219b358fa38d5dc2028')}).then((res)=>{
    console.log('deleted user: ',res.name);
    console.log('user location:',res.location);
  });

});
