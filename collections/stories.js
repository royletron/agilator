Stories = new Meteor.Collection('stories')

Meteor.methods({
  createStory: function(project, name, description, type, points, requester, owner)
  {
    var story = Stories.insert({
      name: name,
      status: "new",
      points: points,
      position: 0,
      project: project._id,
      description: description,
      owner: Meteor.user().username,
      type: type,
      requester: requester,
      owner: owner,
      createdat: moment().unix(),
      updatedat: moment().unix()
    });
    Meteor.call('createUpdate', 'list', "added the story '"+name+"', to <strong>"+project.name+"</strong>", story._id, 'story')
    return story;
  },
  changeStatus: function(story, status)
  {
    var story = Stories.update(story._id, {$set : {status: status, updatedat: moment().unix()}});
    Meteor.call('createUpdate', 'checkmark', "changed the story status of <strong>"+story.name+"</strong>", story._id, 'story');
    return story;
  },
  setOrder: function(id, position, status)
  {
    if(status == undefined)
      Stories.update(id, {$set: {position: position}});
    else
      Stories.update(id, {$set: {position: position, status: status}});
  },
  removeAllStories: function() {
    return Stories.remove({});
  }
})