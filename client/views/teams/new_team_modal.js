Template.new_team_modal.events({
  'keyup #team_member' : function(e,t){
    if($('#team_member').val().length > 4)
      $('#return-members').empty();
      if(delayer != undefined)
        clearTimeout(delayer);
      delayer = setTimeout(function(){
        Meteor.call('getGithubMembers', $('#team_member').val(), function(err, ret){
        var users = ret.users;
        if(users != [])
        {
          $('#return-members').empty();
          $.each(users, function(idx, val){
            console.log(val);
            var display = ""
            if(val.name != null)
              display = " ("+val.name+")";
            $item = $('<div class="link item" data-id="'+val.username+'" data-gravatar="'+val.gravatar_id+'"><img class="circular ui image" src="https://gravatar.com/avatar/'+val.gravatar_id+'" height="30" width="30" style="float:left; margin-top:-7px; margin-bottom:-10px; margin-right:0.5em">'+val.username+display+'</div>');
            $item.click(function(){
              var user = $(this).data('id');
              var gravatar = $(this).data('gravatar');
              var isin = false;
              $('#team_member').val('')
              $.each($('#selected-members').children(), function(idx, item){
                if($(item).data('id') == user)
                {
                  isin = true;
                }
              });
              if(!isin)
              {
                $user_item = $('<div class="ui image label" data-id="'+val.username+'" data-gravatar="'+val.gravatar_id+'"><img src="https://gravatar.com/avatar/'+val.gravatar_id+'">'+user+'<i class="delete icon close"></i></div>')
                $user_item.find('.close').click(function(e){
                  e.preventDefault();
                  $(this).parent().remove();
                  return false;
                })
                $('#selected-members').append($user_item);
              }
              $('#return-members').hide();
            })
            $('#return-members').append($item);
          });
          $('#return-members').show();
        }
        else{
          $('#return-members').hide();
        }
        console.log(ret);
      })
    }, 200)
      
    console.log($('#team_member').val())
  },

  'click .new_team_submit' : function(e, t)
  {
    if($('#team_name').val() == "")
    {
      toastr.warning("Teams need a name!")
      e.preventDefault();
      return false;
    }
    else
    {
      var members = [];
      $.each($('#selected-members').children(), function(idx, item){
        members.push($(item).data('id'))
      });
      if(members.length > 0)
      {
        Meteor.call('createTeam', $('#team_name').val(), members)
        toastr.success("Created team '"+$('#team_name').val()+"'")
      }
      else{
        toastr.warning("Teams need members!")
        e.preventDefault();
        return false;
      }
    }
  }
})

var delayer;