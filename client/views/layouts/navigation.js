Template.navigation.events({
  'click #logout_button' : function(){
    Meteor.logout(function(){
      Session.set("error_message", "Logged out...")
      Router.go('/')
    });
  },
  'click #login_button' : function(){
    Meteor.loginWithGithub({
      requestPermissions: ['user', 'public_repo']
    }, function (err) {
      if (err)
        Session.set('errorMessage', err.reason || 'Unknown error');
      else
        Meteor.call('updateUser', '', function(err, val){
          toastr.success("Logged in!")
          if(val != undefined)
          {
            Meteor.users.update(Meteor.userId(), { $set: {profile: val} });
            if(Updates.find({user: Meteor.user().username, item_type: 'joined'}).fetch().length == 0)
            {
              Meteor.call("createUpdate", "lightbulb", "joined!", '', 'joined')
            }
          }
        })
    });
  }
});

Template.navigation.rendered = function(){
  $('.ui.dropdown').dropdown();
}