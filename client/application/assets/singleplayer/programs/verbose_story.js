// verbose mode, used during scripted story based hacks against the player. These cannot normally be prevented.

$('body').empty();
$('body').append('<div class="content"></div>');
darwin.client.newLine('Attempting to load hOS...');
setTimeout(function() {
    darwin.client.newLine('ERROR: hOS failed to initialize correctly. Now running in safemode.');
}, 1500);
setTimeout(function() {
    darwin.client.newLine('hOS log: found existing background music. Loading...');
}, 2500);
setTimeout(function() {
    $('body').append('<audio autoplay loop class="music" id="music"><source src="../bg.mp3" type="audio/mp3"</audio>');
}, 3500)
setTimeout(function() {
    darwin.client.newLine('The following errors have been identified: ');
    darwin.client.newLine('hOS.kernel.bin failed to load. Reason: file does not exist');
    darwin.client.newLine('hOS.gui.bin failed to load. Reason: file does not exist');
    darwin.client.newLine('--------');
    darwin.client.newLine('hOS will continue to fail normal boot methods until this is resolved. Based on logs, this action may have come from outside your local network.');
    darwin.client.newLine('The last incomming IP Address was an external one, and its value was: 54.67.81.291');
    darwin.client.newLine('--------');
    darwin.client.newLine('Verbose mode is enabled. Type "help" for a list of commands.');
}, 4500);
setTimeout(function() {
    $('body').append('<div class="txt"><form id="commandBoxForm"><input type="text" class="verbose" placeholder="Enter a command..."></form></div>')
}, 5500);
setTimeout(function() {
    $('#commandBoxForm').hide();
}, 5800);
setTimeout(function() {
    $('#commandBoxForm').show();
}, 6200);
setTimeout(function () {
    $('#commandBoxForm').hide();
}, 6400);

setTimeout(function () {
    $('#commandBoxForm').show();
}, 6600);