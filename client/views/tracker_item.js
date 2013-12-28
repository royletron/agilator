Template.tracker_item.newStatus = function(){
  return this.status === "new"
}
Template.tracker_item.startedStatus = function(){
  return this.status === "started"
}
Template.tracker_item.finishedStatus = function(){
  return this.status === "finished"
}
Template.tracker_item.deliveredStatus = function(){
  return this.status === "delivered"
}
Template.tracker_item.acceptedStatus = function(){
  return this.status === "accepted"
}
Template.tracker_item.rejectedStatus = function(){
  return this.status === "rejected"
}
Template.tracker_item.events({
  'click .start_button' : function(e, t)
  {
    Stories.update(this._id, { $set: {status: 'started'} });
  }
})