const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://quanjingchen:test123@cluster0.xabzeyy.mongodb.net/fetcher', { useNewUrlParser: true, useUnifiedTopology: true });

let repoSchema = new mongoose.Schema({
  id: { type: Number, unique: true, dropDups: true },
  name: String,
  owner_name: String,
  html_url: String,
  private: Boolean,
  description: String,
  fork: Boolean,
  stargazers_count: Number,
  forks_count: Number,
  updated_at: Date,
  addedToDB_at: { type: Date, default: Date.now }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (items, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('IM IN DATA SAVE');

  var repos = items.map((item) => {
    var repo = {};
    repo.id = item.id;
    repo.name = item.name;
    repo.owner_name = item.owner.login;
    repo.html_url = item.html_url;
    repo.private = item.private;
    repo.description = item.description;
    repo.fork = item.fork;
    repo.stargazers_count = item.stargazers_count;
    repo.forks_count = item.forks_count;
    repo.updated_at = item.updated_at;
    return repo;
  });

  Repo.insertMany(repos, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

let getAll = (callback) => {
  Repo.find()
  .sort({stargazers_count: -1})
  .limit(25)
  .then(repos => callback(null, repos))
  .catch(err => callback(err, null))
};




module.exports.save = save;
module.exports.getAll = getAll;

// let repo = new Repo({
//   id: item.id,
//   name: item.name,
//   owner_name: item.owner.login,
//   html_url: item.html_url,
//   private: item.private,
//   description: item.description,
//   fork: item.fork,
//   stargazers_count: item.stargazers_count,
//   forks_count: item.forks_count,
//   updated_at: item.updated_at
// })