Teams = new Meteor.Collection('teams');

Meteor.methods({
  createTeam: function(name, members)
  {
    var slug = URLify2(name);
    var counter = 1;
    while(Teams.find({slug: slug}).fetch().length > 0)
    {
      slug = URLify2(name+" "+counter);
      counter++;
    }
    var team = Teams.insert({
      name: name,
      slug: slug,
      owner: Meteor.user().username,
      members: members,
      createdat: moment().unix(),
      updatedat: moment().unix()
    });
    Meteor.call('createUpdate', 'sitemap', "created a new team called </strong>"+name+"</strong>", team._id, 'team')
    return team;
  },
  deleteTeam: function(team)
  {
    var name = team.name;
    Teams.remove({_id: team._id});
    Meteor.call('createUpdate', 'trash', "deleted the team <strong>"+name+"</strong>");
  }
})