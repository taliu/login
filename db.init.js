const db= require('./db');
const User = db.model('users');
//https://github.com/louischatriot/nedb
//User.find({ name: 'solar' })
//User.insert({ name: 'solar',password:'abc123' })
//User.findOne({ planet: 'Earth' })
//User.count({ system: 'solar' }
//User.update(query, update, options, callback)
//User.update({ system: 'solar' }, { $set: { system: 'solar system' } }, { multi: true }
//User.remove(query, options, callback)
//User.remove({ system: 'solar' }, { multi: true })
  User.insert({
     name:'lucy',
     password:'abc123' 
  }).then(user=>{
    console.log('create a user:',user);
  }).catch(err=>console.error(err))