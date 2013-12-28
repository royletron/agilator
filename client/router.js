Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  /**
   * The route's name is "home"
   * The route's template is also "home"
   * The default action will render the home template
   */
  this.route('home', {
    path: '/',
    yieldTemplates: {
      'new_project_modal': {to: 'modal'},
      'home_sub_menu': {to: 'sub_menu'}
    },
    before: function() {
      if(Meteor.user())
      {
        var updates = Updates.find({user: Meteor.userId()}, {sort: {createdat: -1}}).fetch();
        for(var i = 0; i < updates.length; i++)
        {
          updates[i].user = Meteor.users.findOne(updates[i].user);
        }
        Session.set("user_updates", updates);
        Session.set("user_projects", Projects.find({owner: Meteor.userId()}).fetch());
      }
    }
  });

  this.route('tracker', {
    path: '/project/:slug',
    yieldTemplates: {
      'new_story_modal': {to: 'modal'},
      'project_sub_menu': {to: 'sub_menu'}
    },
    before: function() {
      if(Meteor.user())
      {
        Session.set("project", Projects.findOne({slug: this.params.slug}))
      }
      else
      {
        Router.go('/')
        Session.set("error_message", "You need to be logged in to do that!")
      }
    }
  })

})