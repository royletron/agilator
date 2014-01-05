Comments = new Meteor.Collection('comments')

Meteor.methods({
  createComment: function(comment, item, type)
  {
    var comment = Comments.insert({
      comment: comment,
      item: item,
      type: type,
      owner: Meteor.user().username,
      createdat: moment().unix(),
      updatedat: moment().unix()
    });
    //Meteor.call('createUpdate', 'list', "added the story '"+name+"', to <strong>"+project.name+"</strong>", story._id, 'story')
    return comment;
  }
})