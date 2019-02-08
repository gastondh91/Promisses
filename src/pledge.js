'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// TU CÓDIGO AQUÍ:
const $Promise = function(executor){ 
    if(typeof executor !== 'function' ) throw new TypeError(/executor.+function/i);   
    this._state = 'pending';
    this._value = undefined;
    this._handlerGroups = [];
    return executor(this._internalResolve.bind(this),this._internalReject.bind(this))
}

$Promise.prototype._internalResolve= function(data){
    if(this._state === 'pending'){
        this._value = data
        this._state = 'fulfilled'
    } 
    
}

$Promise.prototype._internalReject= function(error){
    if(this._state === 'pending'){
        this._value = error
        this._state = "rejected"
    }    
}

$Promise.prototype.then = function(s, e){
    if(typeof s !== 'function') s = false
    if(typeof e !== 'function') e = false
    this._handlerGroups.push({successCb: s, errorCb : e})
    if( this._state !== 'pending') this._callHandlers(this._value)
    
}


$Promise.prototype._callHandlers = function(data){
    for(let i = 0; i<this._handlerGroups.length; i++){
        this._handlerGroups[i]._callHandlers()
    }

}


/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
