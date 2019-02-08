'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// TU CÓDIGO AQUÍ:
const $Promise = function(executor){
    
    if(typeof executor !== 'function' ) throw new TypeError(this._reason);   
    this._state = 'pending';
    return executor()
}

$Promise.prototype._internalResolve= function(data){
    if(this._state === 'pending') this._value = data
    this._state = 'fulfilled'

}

$Promise.prototype._internalReject= function(){
    this._state = 'rejected'
    this._reason = 'bad request'
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
