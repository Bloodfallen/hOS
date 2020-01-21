// h.me client-side js, for things like game-launch squeunce.
var bootLines = null;

var sport = 9817; // Server port.
var saddr = "localhost"; // server address

var hasErrored = 0; // check if connection errored globally

var $ = require('jQuery'); // import jquery
const net = require('net'); // for websockets

const Particles = require('particles.js');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "alpine"
});

var userName = null;
var userPass = null;

var boot = {
    darwin: {
        startup: (skip) => {
            if(!skip) {
                // Show boot sequence

                // Hide the content and text field so we can display the bootup sequence.
                $('.content').hide();
                $('.txt').hide();
                $('.bootup').removeClass('hidden');
                $('.content').empty();
                // Begin output hell....
                $.get('assets/boot.txt', (data) => {
                    bootLines = data.split("\n");
                    for (var i = 0, len = bootLines.length; i < len; i++) {
                        $('.bootup').append('<span>' + bootLines[i] + '</span><br>');
                        $("html, body").scrollTop($(document).height());
                    }
                });
                $('.content').show();
                $('.txt').show();
                $('.bootup').hide();
                setTimeout(function() {
                    $('.content').append('<span>hOS loaded successfully.</span><br>');
                    darwin.client.newLine("Attempting to connect to hOS servers...");
                    boot.multiplayer.connectMain();
                    if( hasErrored = 1 ) {
                        // connect failed.
                        $('.txt').attr('disabled', 'disabled');
                    } else if( hasErrored = 0 ) {
                        // connect success.
                        $('.content').append('<span>For a list of commands, type "help".</span><br>');
                    }
                }, 800);
                setTimeout(function() {
                    
                }, 1500);
            } else if(skip) {
                // Don't show boot sequence

            }
        }
    },
    multiplayer: {
        connectMain: () => {
            var address = "ws://" + saddr + ":" + sport;
            const client = net.createConnection({port: sport, host: saddr}, () => {
                darwin.client.newLine("Connection to hOS Servers was successful. Log in to continue.");
                hasErrored = 0;
            }).on('error', (err) => {
                darwin.client.newLine("Connection to hOS Servers failed. hOS may be offline, or your connection details may be incorrect.");
                darwin.client.newLine("Note: you can still perform client side commands, such as 'game_settings'");
                hasErrored = 1;
                throw err;
            }).on('end', () => {
                console.error('disconnected!');
                darwin.client.newLine("Connection to the hOS server has been lost. You may run retry_connect to attempt to reconnect.")
            });
        },
        authenticate: () => {
            connection.connect(function (err) {
                if (!err) {
                    // DB Connection Successful!
                    darwin.client.newLine('Connection to hOS authentication servers has succeeded. Please log in.');
                    var query = connection.query('');
                } else {
                    // Connection failed!
                    darwin.client.newLine('An error occured while connecting to the login servers! They may be down or you may not be connected to the internet...');
                }
            })
        },
        login: {
            authenticate: (setting) => {
                if (!setting) {
                    $('.login').slideUp();
                } else {
                    $('.login').slideDown();
                }
            }
        },
        retryConnectAuth: () => {
            if (hasErrored === 1) {
                darwin.client.newLine('Retrying connection to hOS authentication server...');
                boot.multiplayer.connectMain();
            }
        }
    },
};

var darwin = {
    client: {
        newLine: (data) => {
            $('.content').append("<span>" + data + "</span><br>");
            $("html, body, content").scrollTop($(document).height());
        },
        clearInput: () => {
            $('#commandBoxForm > input[type=text]').val("");
        },
        settings: {
            music: {
                volume: (a) => {
                    // set music volume setting. resets on launch rn.
                    $('.music').prop('volume', a);
                }
            }
        },
        commands: {
            help: () => {

            },
            dev_tst_cmd: () => {
                darwin.client.newLine('Command completed successfully. (dev_tst_cmd)');
                console.log('it works!');
            },
            game_settings: (setting) => {
                if(!setting) {
                    $('.settings').slideUp();
                } else {
                    $('.settings').slideDown();
                    setTimeout(function() {
                        darwin.client.newLine('game settings opened.');
                    }, 250);
                    
                }
            }
        }
    }
};

var cmdbox = document.getElementById('commandBoxForm');
cmdbox.addEventListener('submit', event => {
    event.preventDefault();
    // stuff to do
    var field = $('#commandBoxForm > input[type=text]');
    // use if statements to check for commands.
    if ($('#commandBoxForm > input[type=text]').val() === "dev_tst_cmd") {
        darwin.client.commands.dev_tst_cmd();
    }
    if(field.val() === "game_settings" ) {
        darwin.client.commands.game_settings(true);
    }
    if(field.val() === "retry_connect") {
        boot.multiplayer.retryConnectAuth();
    }
    if(field.val() === "gc.auth") {
        boot.multiplayer.login.authenticate(true);
    }
    darwin.client.newLine( $('#commandBoxForm > input[type=text]').val() );
    darwin.client.clearInput();

});

window.onload = function() {
    
}

window.onload = function () {
    /* Particles.init({
        // normal options
        selector: '.background',
        maxParticles: 300,
        // options for breakpoints
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 150,
                    color: '#48F2E3',
                    connectParticles: true
                }
            }
        ]
    }); */
    particlesJS.load('background', 'assets/part.json', function () {
        console.log('callback - particles.js config loaded');
    });
    boot.darwin.startup(false);
}; 

// other event listeners
$('.settings > input[type=range]').on('input', function() {
    var rangeValue = $('.settings > input[type=range]').val();
    darwin.client.settings.music.volume(rangeValue);
});