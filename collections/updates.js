Updates = new Meteor.Collection("updates")

Meteor.methods({
  createUpdate: function(type, details, item, item_type)
  {
    return Updates.insert({
      user: Meteor.user().username,
      item: item,
      item_type: item_type,
      type: type,
      details: details,
      createdat: moment().unix()
    });
  },
  userUpdates: function()
  {
    var updates = Updates.find({user: Meteor.user().username}, {sort: {createdat: -1}}).fetch();
    for(var i = 0; i < updates.length; i++)
    {
      updates[i].user = Meteor.users.findOne(updates[i].user);
    }
    return updates;
  },
  removeAllUpdates: function() {
    return Updates.remove({});
  }
})