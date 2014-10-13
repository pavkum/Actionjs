    (function (){
    
        var actionjs = function(){
    
          var VERSION = 1.0.0;
          var hash = window.location.hash;
            
            
            
          /*
            action List heirarchy
            'actionName' : {
                            actions :[
                                        "1" : [
                                                {
                                                    wait : true / false
                                                    action : function reference
                                                    dependencies : dependency variable / obj names
                                                }
                                            ]
                                    ],
                            'priority' : [1,2,3]
                         }
            
          */
          var actionsList = [];
    
    
          var uiActions = 'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste';
    
          var forEach = function(loopElements , functionRef){
              var loop = loopElements.split(' ');
              for(var i=0; i<loop.length; i++){
                  functionRef(loop[i]);
              }
          };
    
          var compile = function(elem){
    
                elem = elem ? elem : document;
    
                forEach(uiActions , function(action){
    
                    var actionElements = elem.querySelector('[action-' + action + ']');
    
                    for(var i=0; i<actionElements.length; i++){
                        var actionElem = actionElements[i];
    
                        actionElem.addEventListener(action , function (event){
                            triggerAction(actionElem.getAttribute('action-'+action) , [event]);
                        });
                    }
    
                });
          };
    
        var defaultAction = {
            wait : false,
            priority : 5,
            action : function(){},
            dependencies : ''
        };
         
        var extend = function(defaultObj , actualObj){
            
            for(var key in defaultObj){
                var value = actualObj[key];
                
                if(!value)
                    actualObj[key] = defaultObj[key];
            }
            
            return actualObj;
        }
             
             
        /*
            action skeleton
              {
                  'name' : 'actionName',
                  'wait':  wait for completion for async functions, if true, user has to manually resolve the function
                  'priority' : priority of the action, priority 1 will be executed first, no limit on highest bound
                  'functionname' : functionRef
              }
    
          */
            
          var addAction = function(actionName , action){
              
              action = extend(defaultAction , action);
              
              var actionSkeleton = actionsList[actionName];
    
              if(!actionSkeleton){
                
                actionSkeleton = {};
                  
                actionSkeleton.actions = [];
                actionSkeleton.priority = [];
                  
                actionsList[actionName] = actionSkeleton;
                  
              }
              
              if(actionSkeleton.priority.indexOf(action.priority) != -1){
                  actionSkeleton.priority.push(action.priority);
                  
                  actionSkeleton.priority[action.priority] = [];
                  
                  // sort as per priority
                  actionSkeleton.priority.sort();
              }
              
              var prioritizedAction = actionSkeleton.priority[action.priority];
              
              var actionInfo = {};
              actionInfo.wait = action.wait;
              actionInfo.action = action.action;
              actionInfo.dependencies = action.dependencies;
              
              prioritizedAction.push(actionInfo);
              
              
          };
    
          var Scope = function(actionName){
                this.name = actionName;
          };
            
          Scope.prototype.set = function(key, value){
              if(key)
                this[key] = value;
          };
          
          Scope.prototype.get = function(key){
                return this[key];   
          };
            
          // state 
            
          var ASYNC_DONE = 1;
          var ASYNC_ERROR = -1;
            
          var AsyncExecution = function(callback){
                this.callback = callback;
          };
          
          AsyncExecution.prototype.resolve = function(){
                this.callback.call(ASYNC_DONE);
          };
            
          AsyncExecution.prototype.error = function(){
                this.callback.call(ASYNC_ERROR);
          };
            
          var triggerAction = function(actionName , [arguments]){
              // trigger action with arguments
              
              var action = actionsList[actionName];
              
              if(!action)
                  return;
              
              var prioties = action.priority;
              
              var actionData = new ActionData(actionName);
              
              for(var i=0; i<prioties.length; i++){
                 var priority = prioties[i];
                      
                 var actions = action.actions[priority];
                  
                 executeAction(actions , actionData)
                  
              }
              
          };
            
          var executeAction = function(actionsArray , scope) {
               for(var i=0; i<actionsArray.length; i++){
                   var action = actionsArray[i];
                   
                   var dependencies = action.dependencies.split(" ");
                   
                   for(var j=0; )
                   
                   action.call()
               }
          };
    
          var addURLAction = function(actionsJSON){
    
              for(action in actionsJSON){
    
                  var actionData = {
                      action : actionsJSON[action]
                  }
    
                  addAction(action , actionData);
              }
    
          };
    
          // poll for hash change
          
          setInterval(function(){
              
              var presentHash = window.location.hash;
              
              if(hash != presentHash){
                 hash = presentHash;
                 triggerHashChange(); 
              }
              
          },500);
            
          var triggerHashChange = function(){
              triggerAction(hash);
              compile();
          };
    
          return {
    
              registerURLAction : function (actionsJSON){
                  addURLAction(actionsJSON);
              },
    
              on : function(actionData , action){
                  addAction(actionData , action);
              },
    
              version : function (){
                  return VERSION;
              }
    
          }
    
          var previousAction = actionjs;
    
          var action = previousAction;
    
          action.noConflict = function(){
              return previousAction;
          }
    
          return action;
    
        };
    
    })();
