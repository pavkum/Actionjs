(function (){

    var actionjs = function(){

      var VERSION = 1.0.0;

      var actionsPair = [];

      // get all UI events

      var uiActions = 'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste';

      var forEach = function(loopElements , functionRef){
          var loop = loopElements.split(' ');
          for(var i=0; i<loop.length; i++){
              functionRef(loop[i]);
          }
      };

      forEach(uiActions , function(action){

          var actionElements = document.querySelector('[action-' + action + ']');

          for(var i=0; i<actionElements.length; i++){
              var actionElem = actionElements[i];

              actionElem.addEventListener(action , function (event){

              });
          }

      });

      var addAction = function(actionData , actionName){

      };

      var triggerAction = function(arguments){

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
