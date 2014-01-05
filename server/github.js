var github = new GitHub({
    version: "3.0.0", // required
    timeout: 5000     // optional
});

Meteor.methods({
  getGithubTeams: function()
  {
    var username = Meteor.user().services.github.username
    github.authenticate({
      type: "oauth",
      token: Meteor.user().services.github.accessToken
    });
    github.user.getFrom({
      user: username
      }, function(err, res) {
        Meteor.user()
    });
    return "HEY"
  },
  updateUser: function()
  {
    var username = Meteor.user().services.github.username
    github.authenticate({
      type: "oauth",
      token: Meteor.user().services.github.accessToken
    });
    user = github.user.getFrom({
      user: username
    });
    var name = user.name
    console.log(name);
    if(name == undefined)
      name = username
    return({name: name, avatar_url: user.avatar_url});
  },
  getGithubMembers: function(keyword)
  {
    github.authenticate({
      type: "oauth",
      token: Meteor.user().services.github.accessToken
    });
    var users = github.search.users({keyword: keyword})
    return(users);
  }
})