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
  getGithubMember: function(username)
  {
    user = github.user.getFrom({
      user: username
    });
    var name = user.name
    if(name == undefined)
      name = username
    return({name: name, avatar_url: user.avatar_url});
  },
  getGithubMembers: function(keyword)
  {
    var users = github.search.users({keyword: keyword})
    return(users);
  }
})