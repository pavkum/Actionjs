    var action = (function (){
    
        var actionjs = function(){
    
          var VERSION = "1.0.0";
          var hash = window.location.hash;
            
            
            
          /*
            action List heirarchy
            'actionName' : {
                            actions :[
                                        "1" : [
                                                {
                                                    async_wait : true / false
                                                    action : function reference
                                                    dependencies : dependency variable / obj names
                                                }
                                            ]
                                    ],
                            'priorities' : [1,2,3]
                         }
            
          */
          var actionsList = [];
          var routerList = [];
    
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
    
                    var actionElements = elem.querySelectorAll('[action-' + action + ']');
    
                    if(!actionElements)
                        return;
                    
                    for(var i=0; i<actionElements.length; i++){
                        var actionElem = actionElements[i];
    
                        actionElem.addEventListener(action , function (event){
                            triggerAction(event.target.getAttribute('action-'+action) , event);
                        });
                    }
    
                });
          };
    
        var defaultAction = {
            async_wait : false,
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
                  
                actionSkeleton.actions = {};
                actionSkeleton.priorities = [];
                  
                actionsList[actionName] = actionSkeleton;
                  
              }
              
              if(actionSkeleton.priorities.indexOf(action.priority) === -1){
                  actionSkeleton.priorities.push(action.priority);
                  
                  actionSkeleton.actions[action.priority] = [];
                  
                  // sort as per priority
                  actionSkeleton.priorities.sort();
              }
              
              var prioritizedAction = actionSkeleton.actions[action.priority];
              
              var actionInfo = {};
              actionInfo.async_wait = action.async_wait;
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
            
          var triggerAction = function(actionName , arguments){
              // trigger action with arguments
              
              var action = actionsList[actionName];
              
              if(!action)
                  return;
              
              var actionArguments = [];
              
              if(arguments){
                   actionArguments.push(arguments);
              }
              
              actionArguments.push(new Scope(actionName));
              
              executePriority(action , action.priorities , actionArguments , 0);
              
          };
            
          var executePriority = function(actionRef, prioties , actionArguments , position){
            
              if(position >= prioties.length){
                return;   
              }
              
               var priority = prioties[position];
                      
               var prioritizedActions = actionRef.actions[priority];
              
               var priority = new PriorityInvoker(prioritizedActions , actionArguments);
              
               priority.executeActions();
              
               priority.onDone(function(){
                    executePriority(actionRef , priorities , actionArguments , position++);
               });
              
              priorities.onTerminate(function(){
                // do nothing
              });
              
               //executeAction(actionsOfPriority , scope)
              
          };
            
          var PriorityInvoker = function(prioritizedActions ,actionArguments){
              this.prioritizedActions = prioritizedActions;
              this.actionArguments = actionArguments;
              
              this.asyncWaitQueue = 0;
              
              
              
              this.asyncWaitCallback = function(asyncStatus){
                  this.asyncWaitQueue = this.asyncWaitQueue - 1;  
                  if(asyncStatus === ASYNC_DONE){
                            if(this.asyncWaitQueue == 0){
                                PriorityInvoker.onDone.call();       
                            }
                        
                    }else if(asyncStatus === ASYNC_ERROR){
                           PriorityInvoker.onTerminate.call();
                    }
              };
              
          };
            
          PriorityInvoker.prototype.executeActions = function(){
              for(var i=0; i<this.prioritizedActions.length; i++){
                   var ac = this.prioritizedActions[i];
                   
                   if(ac.async_wait === true){
                       var asyncExecution = new AsyncExecution(this.asyncWaitCallback);
                       this.asyncWaitQueue = this.asyncWaitQueue + 1;
                       
                       this.actionArguments.push(asyncExecution);
                   }
                  
                  if(!ac.action.apply(this.actionArguments)){
                        PriorityInvoker.onTerminate.call();
                  }
               }
              
              if(this.asyncWaitQueue === 0){
                  PriorityInvoker.onDone.call();  
              }
          };
            
          PriorityInvoker.prototype.onDone = function(callback){
              callback.call();
          };
            
          PriorityInvoker.prototype.onTerminate = function(callback){
                callback.call();  
          };
            
          var addURLAction = function(actionsJSON){
    
              for(action in actionsJSON){
                    routerList[action] = actionsJSON[action];
                  //addAction(action , actionData);
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
            
          var navigate = function(hash , data){
              if(routerList[hash])
                window.location.hash - hash;
                triggerAction(routerList[hash] , data);
          };
            
          window.onload = function(){
              compile();
          };
    
          return {
    
              router : function (actionsJSON){
                  addURLAction(actionsJSON);
              },
    
              on : function(actionData , action){
                  addAction(actionData , action);
              },
    
              version : function (){
                  return VERSION;
              },
              
              trigger : function(actionName , arguments){
                  triggerAction(actionName , arguments);
              },
              
              navigate : function(hash , data){
                navigate(hash , data);   
              }
    
          }
    
        };
        
         var previousAction = actionjs();
    
          var action = previousAction;
    
          action.noConflict = function(){
              return previousAction;
          }
    
          return action;
    
    })();
