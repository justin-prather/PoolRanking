$(function() {
  var $table = $('#table-body');
  var table_template = $('#table-entry-template').html();
  var $spinner = $('.spinner');

  $.ajax({
    type: 'GET',
    url: '/player',
    success: function(players) {
      $.each(players, function(i, player) {
        $table.append(Mustache.render(table_template, player));
      });

      $spinner.addClass(".hidden");
    }
  });
});

$(function() {
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
});
