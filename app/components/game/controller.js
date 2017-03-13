angular
    .module('app.game')
    .controller('GameController', function($scope){
    
    var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'phaser', { 
        preload: onPreload, 
        create: onCreate, 
        update: onUpdate,
        resize: onResize 
    });

    function onPreload(){ }
    function onCreate(){ }
    function onUpdate(){ }
    function onResize(){ }

});