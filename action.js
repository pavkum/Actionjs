(function (){

    var actionjs = function(){

      var VERSION = 1.0.0;

      /*
        action List heirarchy
        'actionName' : [
                        {}
                      ]
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

      /*
        action skeleton
          {
              'name' : 'actionName',
              'async':  can it be executed asynchronously if its async in nature
              'priority' : priority of the action, priority 1 will be executed first, no limit on highest bound
              'functionname' : functionRef
          }

      */

      var addAction = function(actionName , actionName){
          var action = actionsList[actionName];

          if(action){

          }else{
              var actions
          }
      };

      var triggerAction = function(actionName , [arguments]){
          // trigger action with arguments
      };

      var addURLAction = function(actionsJSON){

          for(action in actionsJSON){

              var actionData = {
                  'async' : false,
                  'priority' : 5,
                  'action' : actionsJSON[action]
              }

              addAction(action , action);
          }

      };

      var updateHash = function(urlHash){
          window.location.hash = urlHash;
          triggerAction(urlHash);
      };

      return {

          registerURLAction : function (actionsJSON){
              addURLAction(actionsJSON);
          },

          on : function(actionData , action){
              addAction(actionData , action);
          },

          hash : function(urlHash) {
              updateHash(urlHash);
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
