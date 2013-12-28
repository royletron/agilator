Projects = new Meteor.Collection('projects');

Meteor.methods({
  createProject: function(name, description)
  {
    var slug = URLify2(name);
    var counter = 1;
    while(Projects.find({slug: slug}).fetch().length > 0)
    {
      slug = URLify2(name+" "+counter);
      counter++;
    }
    var project = Projects.insert({
      name: name,
      slug: slug,
      description: description,
      owner: Meteor.userId(),
      members: [Meteor.userId()],
      createdat: moment().unix(),
      updatedat: moment().unix()
    });
    Meteor.call('createUpdate', 'fork code', "created a new project called '"+name+"'", project._id, 'project')
    return project;
  }
})