Stories = new Meteor.Collection('stories')

Meteor.methods({
  createStory: function(project, name, description, type, requester, owner)
  {
    var story = Stories.insert({
      name: name,
      status: "new",
      project: project._id,
      description: description,
      owner: Meteor.userId(),
      type: type,
      requester: requester,
      owner: owner,
      createdat: moment().unix(),
      updatedat: moment().unix()
    });
    Meteor.call('createUpdate', 'list', "added the story '"+name+"', to <strong>"+project.name+"</strong>", story._id, 'story')
    return story;
  },
  removeAllStories: function() {
    return stories.remove({});
  }
})