$(function(){
  var $table = $('#table-body');
  var table_template = $('#table-entry-template').html();
  var $spinner = $('.spinner');

  $.ajax({
    type: 'GET',
    url: '/player',
    success: function(players){
      $.each( players, function(i, player){
        $table.append(Mustache.render(table_template, player ));
      });

      $spinner.addClass(".hidden");
    }
  });
});
