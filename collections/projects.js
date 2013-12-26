Projects = new Meteor.Collection('projects');

Meteor.methods({
  createProject: function(name, description)
  {
    Meteor.call('createUpdate', 'fork code', "<strong>You</strong> created a new project called '"+name+"'")
    var slug = URLify2(name);
    var counter = 1;
    while(Projects.find({slug: slug}).fetch().length > 0)
    {
      slug = URLify2(name+" "+counter);
      counter++;
    }
    return Projects.insert({
      name: name,
      slug: slug,
      description: description,
      owner: Meteor.userId(),
      members: [Meteor.userId()],
      createdat: moment().unix(),
      updatedat: moment().unix()
    });
  }
})