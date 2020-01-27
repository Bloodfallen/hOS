// this is the main program loader for ingame. it relies on javascript, like the rest of the game does
// this just calls these programs.

var sp = {
    load: (file) => {
        $.getScript('./' + file + '.js');
    }
}