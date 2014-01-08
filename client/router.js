Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404'
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
      Session.set('currentpage', 'home')
      if(Meteor.user())
      {
        Session.set('currentsubpage', 'dashboard');
        var updates = Updates.find({user: Meteor.user().username}, {sort: {createdat: -1}}).fetch();
        for(var i = 0; i < updates.length; i++)
        {
          updates[i].user = Meteor.users.findOne({username: updates[i].user});
        }
        Session.set("user_updates", updates);
        Session.set("user_projects", Projects.find({owner: Meteor.user().username}).fetch());
        var teams = [];
        $.each(Teams.find({ $or: [{owner: 'royletron'}, { members: { $in: ['royletron'] }  }] }).fetch(), function(idx, val){
          //console.log(val);
          teams.push(val._id);
        });
        Session.set("team_projects", Projects.find({$and: [{team: {$in: teams}, owner: { $not: Meteor.user().username } }]}).fetch())
      }
    }
  });

  this.route('project', {
    path: '/project/:slug',
    yieldTemplates: {
      'project_sub_menu': {to: 'sub_menu'}
    },
    before: function() {
      Session.set('currentpage', 'home')
      Session.set('currentsubpage', 'home');
      if(Meteor.user())
      {
        var project = Projects.findOne({slug: this.params.slug});
        Session.set("project", project)
        Session.set("comments", Comments.find({type: 'project', item: project}))
      }
      else
      {
        Router.go('/')
        Session.set("error_message", "You need to be logged in to do that!")
      }
    }
  })

  this.route('tracker', {
    path: '/project/:slug/tracker',
    yieldTemplates: {
      'new_story_modal': {to: 'modal'},
      'project_sub_menu': {to: 'sub_menu'}
    },
    before: function() {
      Session.set('currentpage', 'home');
      Session.set('currentsubpage', 'tracker');
      if(Meteor.user())
      {
        var project = Projects.findOne({slug: this.params.slug})
        Session.set("project", project);
        var stories = Stories.find({project: project._id}).fetch();
        $.each(stories, function(idx, val){
          //console.log(val);
          val.user_info = Meteor.users.findOne({username: val.owner});
          if(val.user_info == null)
            Meteor.call("getGithubMember", val.owner, function(err, user){
              //console.log("!"+user);
              Session.set("user_"+val.owner, user);
            });
        })
      }
      else
      {
        Router.go('/')
        Session.set("error_message", "You need to be logged in to do that!")
      }
    }
  });

  this.route('teams', {
    path: '/teams',
    yieldTemplates: {
      'new_team_modal': {to: 'modal'},
      'teams_sub_menu': {to: 'sub_menu'}
    },
    before: function() {
      Session.set('currentpage', 'teams')
      if(Meteor.user())
      {
        Session.set("user_owned_teams", Teams.find({owner: Meteor.user().username}, {sort: {createdat: -1}}).fetch());
        var mteams = Teams.find({members: { $in: [Meteor.user().username]} }, {sort: {createdat: -1}}).fetch();
        $.each(mteams, function(idx, val){
          val.owner_info = Meteor.users.findOne({username: val.owner});
        });
        Session.set("user_member_teams", mteams);
      }
    }
  })

})

function getUserInfo(data)
{
  $.each(data, function(idx, val){
    //console.log(val);
  })
}