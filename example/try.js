var actionData = {
    'home' : 'toHome',
    'contact' : 'toContact'
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