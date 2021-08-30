const app = angular.module('MTGDraft', [])

app.controller('CardController', ['$http', function($http){
    const ctrl = this;
    this.setTitle = '';

    this.getNewSet = () => {
        if(ctrl.setTitle) console.log(ctrl.setTitle)
        else console.log("nothing")
    }
    
}])