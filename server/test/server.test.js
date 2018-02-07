const expect = require('expect');
const request = require ('supertest');
const {ObjectID} = require('mongodb');
var { Todos2 } = require('./../models/Todos2');
var { app } = require('./../server');

const todos = [{
  _id: new ObjectID(),
  text:'First test todo'
},{
  _id: new ObjectID(),
  text:'Second test todo',
  completed: true,
  completedAt:333
}];

beforeEach((done)=>{
  Todos2.remove({}).then(()=>{
    return Todos2.insertMany(todos);
  }).then(()=>done());
});

describe('POST /Todos2',()=>{
  it('should create a new todo',(done)=>{
      var text ='Testing todo text';

      request(app)
      .post('/Todos2')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }

        Todos2.find({text}).then((todo)=>{
          expect(todo.length).toBe(1);
          expect(todo[0].text).toBe(text);
          done();
        }).catch((e)=>done(e));

      });
    });

    it('should not create to do with invalid data',(done)=>{
      request(app)
        .post('/Todos2')
        .send({})
        .expect(400)
        .end((err, res)=>{
          if(err){
            return done(err);
          }

          Todos2.find().then((todo)=>{
            expect(todo.length).toBe(2);
            done();
          }).catch((e)=>done(e));
        })
    });


});

describe('GET /Todos2',()=>{
  it('should get all todos',(done)=>{
    request(app)
      .get('/Todos2')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.length).toBe(2);
      })
      .end(done);
  })
});

describe('GET /Todos2/:id',()=>{
  it('should return todo doc', (done)=>{
    request(app)
      .get(`/Todos2/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done)=>{
    var falseId = new ObjectID().toHexString();
    //console.log('falseId: ',falseId);
    request(app)
      .get(`/Todos2/${falseId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids',(done)=>{
    var falseId2 = '123abc';
    request(app)
      .get(`/Todos2/${falseId2}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /Todos2/:id',()=>{
  it('should remove a todo',(done)=>{
    var hexID = todos[1]._id.toHexString();
    request(app)
      .delete(`/Todos2/${hexID}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        //query database using findById toNotExist
        //expect (null).toNotExist();

        Todos2.findById(hexID).then((todo)=>{
          expect(todo).toNotExist();
          done();
        }).catch((e)=>done(e));
      })
  });
  it('should return 404 if todo not found',(done)=>{
    var falseId = new ObjectID().toHexString();
    //console.log('falseId: ',falseId);
    request(app)
      .delete(`/Todos2/${falseId}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 if object is invalid',(done)=>{
    var falseId2 = '123abc';
    request(app)
      .delete(`/Todos2/${falseId2}`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /Todos2/:id',()=>{
  it('should update todo',(done)=>{
      //grab id of first item
      //update text, set completed to true
      //200
      //text is change, completed is true, completedAt is number
      var firstID = todos[0]._id.toHexString();
      request(app)
        .patch(`/Todos2/${firstID}`)
        .expect(200)
  });
  it('should clear completedAt when todo is not completed',(done)=>{
    // grab id of second item
    // update text, set completed to false
    //200
    //text is change, completed is false, completedAt is null .toNotExist
  });


})
