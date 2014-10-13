var actionData = {
    'home' : 'homeAction',
    'contact' : 'contactAction'
};

actions.registerURLAction(actionData);


action.on('homeAction' , ['async' , '1' , ['a', 'b'],  function(a, b){
  // assume everything as action
    set(a , dasd)
    set(b , asdas)
}]);

action.on('homeAction' , ['async' , '2' , ['a' , 'b'] ,function(a,b){
    get(a)
    get(b)
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
