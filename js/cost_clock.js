$(function(){
  var clock, startDate, lastDate;
  var personMliliseconds = 0;
  
   
  function setSalary() { 
  	// Yes, I realise I * 1000 then / 1000
	  return $('#salary input').val() * 1000 / 46 / 5 / 7.5 / 60 / 60 / 1000;
  }
  
  function startClock() {
    startDate = lastDate = new Date();
    clock = setInterval(counter, 10);
  }

  function counter() {
    var now = new Date();
    updatePersonMiliseconds(now);
    displayCost();
    displayElapsedTime(now);
    lastDate = now;
  }

  function peepsCount() {
    return $('#peeps li').length;
  }

  function updatePersonMiliseconds(now) {
    personMliliseconds += (now - lastDate) * peepsCount();
  }

  function totalCost() {
    return (personMliliseconds * costPerMilisecond).toFixed(2);
  }

  function displayCost() {
    $('#dollarValue').text(totalCost());
  }

  function pluralize(number, label) {
    var string = number + ' ' + label;
    if (number !== 1) { string += 's'; }
    return string;
  }

  function displayElapsedTime(time) {
    var seconds = Math.floor((time - startDate) / 1000);
    var totalMinutes = Math.floor(seconds / 60);
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    var elapsed = [];
    if (hours)   { elapsed.push(pluralize(hours, 'hour')); }
    if (minutes) { elapsed.push(pluralize(minutes, 'minute')); }

    $('#elapsedTime').text(elapsed.join(' ') || 'just started');
  }

  $('#plus').click(function(){
    $('#peeps').append('<li><span class="glyphicon glyphicon-user"></span></li>');
    if (!clock) { startClock(); }
  });

  $('#minus').click(function(){
    if (peepsCount()) {
      $('#peeps li').last().remove();
    }
  });
  
  $('#salary input').change( function() {
  	costPerMilisecond = setSalary();
  }); 
 
  var costPerMilisecond = setSalary();  
 

});
