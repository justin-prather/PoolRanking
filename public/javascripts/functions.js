$(document).ready(function() {
  var $table = $('#table-body');
  var table_template = $('#table-entry-template').html();
  var dropdown_template = $('#dropdown-template').html();
  var $spinner = $('.spinner');
  var $firstName = $('#first-name');
  var $lastName = $('#last-name');
  var $winner = $('#Winner');
  var $looser = $('#Looser');

  $.ajax({
    type: 'GET',
    url: '/player',
    success: function(players) {
      $.each(players, function(i, player) {
        $winner.append(Mustache.render( dropdown_template, player));
        $looser.append(Mustache.render( dropdown_template, player));
        $table.append(Mustache.render(table_template, player));
      });

      $spinner.addClass(".hidden");
    }
  });

  $(".slider").click(function(event) {
    if (event.target.id == "player-head") {
      if (!$("#player-form").hasClass("show")) {
        $('#player-form').slideDown();
        $('#player-form').addClass("show");
      } else {
        $('#player-form').slideUp();
        $('#player-form').removeClass("show");
      }
    }
    else if (event.target.id == "match-head") {
      if (!$("#match-form").hasClass("show")) {
        $('#match-form').slideDown();
        $('#match-form').addClass("show");
      } else {
        $('#match-form').slideUp();
        $('#match-form').removeClass("show");
      }
    }
  });

  $("#submit-player").on('click', function(){
      var player = {
        Name_First: $firstName.val(),
        Name_Last: $lastName.val(),
      };

      $.ajax({
        type: 'POST',
        url: '/player',
        data: player,
        success: function(NewPlayer) {
          location.reload();
        }
      });
  });

  $("#submit-match").on('click', function(){
      var match = {
        Winner: $winner.val(),
        Looser: $looser.val(),
      };

      $.ajax({
        type: 'POST',
        url: '/match',
        data: match,
        success: function(NewMatch) {
          location.reload();
        }
      });
  });

  $("table").delegate('tr', 'click', function(event) {
      var parent = $(event.target).parent();
      alert(parent.id);
      //get <td> element values here!!??
  });

});
