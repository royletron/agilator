Updates = new Meteor.Collection("updates")

Meteor.methods({
  createUpdate: function(type, details)
  {
    return Updates.insert({
      user: Meteor.userId(),
      type: type,
      details: details,
      createdat: moment().unix()
    });
  },
  userUpdates: function()
  {
    return Updates.find({user: Meteor.userId()}).fetch();
  }
})