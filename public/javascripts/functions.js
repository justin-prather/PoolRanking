$(function(){
  var $table_entry = $('#table-body');
  var $table_template = $('#table-entry-template');

  $.ajax({
    type: 'GET',
    url: '/player',
    success: function(players){
      $.each( players, function(i, player){
        $table_entry.append(Mustache.render($table_template, player));
      });
    }
  })
});
