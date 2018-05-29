

angular.module('AppChat').controller('ContactController', ['$http', '$log', '$scope', '$location','$routeParams','loggedUser',
    function($http, $log, $scope, $location,$routeParams,loggedUser) {
        var thisCtrl = this;


        this.contactList = [];
        this.loggedUser = loggedUser.getUser();



        this.loadContacts = function(){

            //uID = 5

            // First set up the url for the route
            var url = "http://localhost:5000/users/"+thisCtrl.loggedUser[0].uID+"/contacts";
            console.log("reqURL: " + url);
            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.contactList = response.data.Contacts;

            }, // error callback
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                console.log("Err response: " + JSON.stringify(response));

                var status = response.status;
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){
                    alert("No se encontro la informacion solicitada.");
                }
                else {
                    alert("Error interno del sistema.");
                }
            });


        };


        this.loadContacts();

}]);
