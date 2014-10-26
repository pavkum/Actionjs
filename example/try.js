var actionData = {
    'home' : 'toHome',
    'contact' : 'toContact',
    'malla'   : 'malla'
};

action.router(actionData);

action.on('toHome' , {
    action : function(){
        document.getElementById('hash').innerHTML = "Home"
        return true;
    }
});

action.on('toContact' , {
    action : function(data){
        console.log(data);
        document.getElementById('hash').innerHTML = "Contact"
        return true;
    }
});

action.on('malla' , {
    priority:2,
    action : function(scope){
        console.log(scope.get('name'));

        document.getElementById('hash').innerHTML = "malla"
        return true;
    }
});

action.preActions('malla' , 'toContact');
action.postActions('malla' , 'toHome');

action.on('malla' , {
    priority:1,
    async_wait : true,
    action : function(scope , asyncExc){
        scope.set('name' , 'pavan');
        console.log(1);
        document.getElementById('hash').innerHTML = "malla"

        setTimeout(function(){
          //action.navigate('contact' , 'abc');
          asyncExc.error();
        },1000);

        return true;
    }
});
