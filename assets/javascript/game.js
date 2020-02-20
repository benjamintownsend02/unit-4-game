//Characters
//Tested for win/loss possibility for each character
var obiwan = {name:"Obi-Wan Kenobi", health:140, attack: 10, counter: 50};
var luke = {name:"Luke Skywalker", health:100, attack: 30, counter: 15};
var frank = {name:"Darth Sidious", health:150, attack: 20, counter: 25};
var maul = {name:"Darth Maul", health:300, attack: 10, counter: 5};

//Initial fighter html setup and display
var obiwanHtml ='<div id="obiwan-container" class="character-data">' + 
                '<div id="obiwan-name">' + obiwan.name + '</div>' +
                '<img src="assets/images/obiwan_image.jpg" alt="obiwan" width="120" height="120">' +
                '<div class="obiwan-health">' + obiwan.health +'</div>' +
                '</div>';

var lukeHtml = '<div id="luke-container" class="character-data">' + 
               '<div id="luke-name">' + luke.name + '</div>' +
                '<img src="assets/images/luke_image.jpg" alt="luke" width="120" height="120">' +
                '<div class="luke-health">' + luke.health +'</div>' +
                '</div>';

var frankHtml ='<div id="frank-container" class="character-data">' + 
                '<div id="frank-name">' + frank.name + '</div>' +
                '<img src="assets/images/sidious_image.jpg" alt="sidious" width="120" height="120">' +
                '<div class="frank-health">' + frank.health +'</div>' +
                '</div>';

var maulHtml ='<div id="maul-container" class="character-data">' + 
                '<div id="maul-name">' + maul.name + '</div>' +
                '<img src="assets/images/maul_image.png" alt="maul" width="120" height="120">' +
                '<div class="maul-health">' + maul.health +'</div>' +
                '</div>';

$('#char1').append(obiwanHtml);
$('#char2').append(lukeHtml);
$('#char3').append(frankHtml);
$('#char4').append(maulHtml);

//Global variables
var attackerSelected=false;
var defenderSelected=false;
var ended=false;
var attacker;
var defender;
var attackBonus=0;
var baseAttack=0;
var healthID="";
var attackerHealthID="";
var defenderHealthID="";
var defenderNumber=0;
var victoryPoints=0;

//Returns game to beginning state
function reset()
{
    obiwan.health=140;
    $('.obiwan-health').html(obiwan.health);
    luke.health=100;
    $('.luke-health').html(luke.health);
    frank.health=150;
    $('.frank-health').html(frank.health);
    maul.health=300;
    $('.maul-health').html(maul.health);
    $('#char1').show();
    $('#char2').show();
    $('#char3').show();
    $('#char4').show();
    $('#display-results').html(" ");
    $('#display-attack').html(" ");
    $('#display-defend').html(" ");
    if(attackerSelected)
    {
        $('#selection-container').append($('#characters-image'));
        $('#attacker-display').empty();
        $(attackerHealthID).html(attacker.health);
    }
    $('#defender-display').empty();
    try
    {
        $(defenderHealthID).html(defender.health);
    }
    catch(err){};
    attackBonus=0;
    baseAttack=0;
    attackerSelected=false;
    defenderSelected=false;
    attacker=null;
    defender=null;
    attackerHealthID="";
    defenderHealthID="";
    defenderNumber=0;
    victoryPoints=0;
    ended=false;
    $('#instructions').html("Choose your character!");
}

//Facilitates individual duel victories
function oneVictory(k)
{
    victoryPoints++;
    if(victoryPoints>2)
    {
        ended=true;
        $('#instructions').html("Game over! Press reset to play again.");
        $('#display-results').html("YOU WON! Game Over.");
    }
    else
    {
        //var defenderString="#char"+k;
        //console.log(k);
        defenderSelected=false;
        $('#instructions').html("Choose your enemy!");
        $('#defender-display').empty();
        $('#display-results').html("You have defeated " + defender.name + "! Choose another opponent.");
        //$(defenderString).show();
    }
    
}

//Performs an attack and facilitates losses
function attack(offense,defense)
{
if(!ended)
{
    if(attackerSelected && defenderSelected)
    {
        defense.health-=(offense.attack+attackBonus);
        offense.health-=defense.counter;
        attackBonus+=baseAttack;
        $(attackerHealthID).html(offense.health);
        $(defenderHealthID).html(defense.health);
        //console.log(offense.health);
        //console.log(defense.health);
        $('#display-attack').html("You attacked " + defender.name + " for " + (offense.attack+attackBonus) + " damage!");
        $('#display-defend').html(defender.name + " attacked you back for " + defense.counter + " damage!");
        if(offense.health<1)
        {
            ended=true;
            $('#instructions').html("Game over! Press reset to play again.");
            $('#display-results').html("YOU LOST! Game Over.");

        }
        else if(defense.health<1)
        {
            oneVictory(defenderNumber);
        }

        
    }
}
   
  
}

//Controls character selection
function select(j)
{
if(!ended)
{
        var chosen;
        var chosenDiv;
        var currentFighter;
        var currentHealthID;
    if(j===1)
    {
        chosen=$('#obiwan-container');
        chosenDiv= $('#char1');
        currentFighter=obiwan;
        currentHealthID=".obiwan-health";
    }
    else if(j===2)
    {
        chosen=$('#luke-container');
        chosenDiv= $('#char2');
        currentFighter=luke;
        currentHealthID=".luke-health";
    }
    else if(j===3)
    {
        chosen=$('#frank-container');
        chosenDiv= $('#char3');
        currentFighter=frank;
        currentHealthID=".frank-health";

    }
    else if(j===4)
    {
        chosen=$('#maul-container');
        chosenDiv= $('#char4');
        currentFighter=maul;
        currentHealthID=".maul-health";
    }
    else
    {
        chosen=$('#obiwan-container');
        chosenDiv= $('#char1');
        currentFighter=obiwan;
        //currentHealthID=".obiwan-health";
    }

    if(!attackerSelected)
    {
        attackerSelected=true;
        $('#attacker-display').append(chosen.clone().css("background-color","blue"));
       chosenDiv.hide();
        $('#instructions').html("Choose your enemy!");
        $('#enemies-display').append($('#characters-image'));
        attacker=currentFighter;
        baseAttack=currentFighter.attack;
        attackerHealthID=currentHealthID;
    }
    else if(!defenderSelected)
    {
        defenderSelected=true;
        $('#defender-display').append(chosen.clone().css("background-color","red"));
        chosenDiv.hide();
        $('#instructions').html("Battle!");
        defender=currentFighter;
        defenderHealthID=currentHealthID;
        defenderNumber=j;
    }
}
    
   
}

//Click events
$('#char1').click(function()
{
    select(1);
});
$('#char2').click(function()
{
    select(2);
});
$('#char3').click(function()
{
    select(3);
});
$('#char4').click(function()
{
    select(4);
});
$('#reset-btn').click(function()
{
    reset();
});
$('#fight-btn').click(function()
{
    attack(attacker,defender);
});