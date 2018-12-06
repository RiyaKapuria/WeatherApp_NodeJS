var getUser = (id, callback) => {
  var user = {
    id,
    name: 'Riya'
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(454, (userObject) => {
  console.log(userObject);
});