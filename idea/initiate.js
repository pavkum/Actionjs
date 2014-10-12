var actionData = {
    'home' : 'homeAction',
    'contact' : 'contactAction'
};

actions.registerURLAction(actionData);


action.on('homeAction' , ['async' , 'priority' , function(){
  // assume everything as action
}]);

action.on('contactAction' , ['async' , 'priority' , function(){

}]);







var action1 = new EventAction('selector' , 'click');

var dummyFunction = function(){

}

var dummyFunction2 = function(){

}

action1.addItem(dummyFunction, async , priority );
action1.addItem(dummyFunction2, async , priority );

//var viewAction = new ViewAction('urlTemplate')


actions.addAction('homeAction' , function(arguments){

    // actions


});



var actionData = {
    'home' : 'homeAction',
    'contact' : 'contactAction'
};

actions.registerURLAction(actionData);
