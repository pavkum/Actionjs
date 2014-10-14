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
    action : function(){
        document.getElementById('hash').innerHTML = "Contact" 
        return true;
    }
});

action.on('malla' , {
    priority:2,
    action : function(){
        console.log(2);
        document.getElementById('hash').innerHTML = "malla" 
        return true;
    }
});

action.on('malla' , {
    priority:1,
    action : function(){
        console.log(1);
        document.getElementById('hash').innerHTML = "malla" 
        return true;
    }
});