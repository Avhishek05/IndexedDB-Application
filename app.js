(function(){
	'use strict';

	var app = angular.module('app',['ngMaterial','indexedDB'])
	.config(function ($indexedDBProvider) {
		$indexedDBProvider
		.connection('myIndexedDB')
		.upgradeDatabase(1, function(event, db, tx){
			tableName=[	
			{"name" : "weather", "keyPath" : "countries"},
			{"name" : "ENGLAND", "keyPath" : "name"},
			{"name" : "JAPAN", "keyPath" : "city.name"},
			{"name" : "RUSSIA", "keyPath" : "city.name"}];

			_.each(tableName, function(store) {
				db.createObjectStore(store.name, {keyPath: store.keyPath}); });

		});
	});

	app.controller('indexDBtest',function($scope, $http,$indexedDB){

		var countries = [
		{"countries" : "ENGLAND", "code" : 1},
		{"countries" : "JAPAN", "code" : 2},
		{"countries" : "RUSSIA", "code" : 3}
		];
		$indexedDB.openStore('weather', function(store){

			store.upsert(countries)
			.then(function(e){
				console.log("inserted");

			});
		});

		let uri_london = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22"
		$http.get(uri_london)
		.then(data => {
			insertIntoENGLANDTable(data.data);
			reteriveEnglandData($scope); 
	})
		.catch(error => {
			alert(error);
		})

		function insertIntoENGLANDTable(data){
			$indexedDB.openStore('ENGLAND', function(store){
				store.upsert(data)
				.then(function(e){
					console.log("inserted in ENGLAND");
				});
			});
		}
		function reteriveEnglandData(){
			$indexedDB.openStore('ENGLAND', function(store){
				store.getAll()
				.then(function(data) { 
				console.log(data[0]); 
					$scope.eng_data=data[0];
				});
			});
		}



		let uri_moscow = "https://samples.openweathermap.org/data/2.5/forecast/hourly?id=524901&appid=b6907d289e10d714a6e88b30761fae22"
		$http.get(uri_moscow)
		.then(data => {
			insertIntoRUSSIATable(data.data);
			reteriveRussiaData($scope);
		})
		.catch(error => {
			alert(error);
		})

		function insertIntoRUSSIATable(data){
			$indexedDB.openStore('RUSSIA', function(store){
				store.upsert(data)
				.then(function(e){
					console.log("inserted in RUSSIA");

				});
			});

		}
		function reteriveRussiaData(){
			$indexedDB.openStore('RUSSIA', function(store){
				store.getAll()
				.then(function(data) { 
				console.log(data[0]); 
					$scope.russia_data=data[0];
				});
			});
		}

		let uri_shuzenji = "https://samples.openweathermap.org/data/2.5/forecast/hourly?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22"
		$http.get(uri_shuzenji)
		.then(data => {
			insertIntoJAPANTable(data.data);
			reteriveJAPANData($scope);
		})
		.catch(error => {
			alert(error);
		})

		function insertIntoJAPANTable(data){
			$indexedDB.openStore('JAPAN', function(store){
				store.upsert(data)
				.then(function(e){
					console.log("inserted in JAPAN");

				});
			});
		}
		function reteriveJAPANData(){
			$indexedDB.openStore('JAPAN', function(store){
				store.getAll()
				.then(function(data) { 
				console.log(data[0]); 
					$scope.japan_data=data[0];
				});
			});
		}

	});	
})()



//     'use strict';

//     angular.module('myApp.weather', ['ngRoute', 'indexedDB'])
//         .config('$routeProvider',[function($routeProvider, $indexedDBProvider)
//         {$routeProvider
//             .when('/weather', {
//                 templateUrl: 'weather/weather.tpl.html',
//                 controller: 'weatherCtrl'
//             });
//             $indexedDBProvider
//                 .connection('myIndexedDB')
//                 .upgradeDatabase(1, function (event, db, tx) {
//                     var tableName = [
//                         {"name": "weather", "keyPath": "countries"},
//                         {"name": "ENGLAND", "keyPath": "name"},
//                         {"name": "JAPAN", "keyPath": "city.name"},
//                         {"name": "RUSSIA", "keyPath": "city.name"}];

//                     _.each(tableName, function (store) {
//                         db.createObjectStore(store.name, {keyPath: store.keyPath});
//                     });

//                 });
//         } ])




//         .controller('weatherCtrl', [function ($scope, $http, $indexedDB) {
//             var countries = [
//                 {"countries": "ENGLAND", "code": 1},
//                 {"countries": "JAPAN", "code": 2},
//                 {"countries": "RUSSIA", "code": 3}
//             ];
//             $indexedDB.openStore('weather', function (store) {

//                 store.upsert(countries)
//                     .then(function (e) {
//                         console.log("inserted");

//                     });
//             });

//             var uri_london = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22"
//             $http.get(uri_london)
//                 .then(function(data){
//                     insertIntoENGLANDTable(data.data);
//                     reteriveEnglandData($scope);
//                 })

//                 .catch(function (error) {
//                     alert(error);
//                 });


// function insertIntoENGLANDTable(data) {
//     $indexedDB.openStore('ENGLAND', function (store) {
//         store.upsert(data)
//             .then(function (e) {
//                 console.log("inserted in ENGLAND");
//             });
//     });
// }

// function reteriveEnglandData() {
//     $indexedDB.openStore('ENGLAND', function (store) {
//         store.getAll()
//             .then(function (data) {
//                 console.log(data[0]);
//                 $scope.eng_data = data[0];
//             });
//     });
// }


// var uri_moscow = "https://samples.openweathermap.org/data/2.5/forecast/hourly?id=524901&appid=b6907d289e10d714a6e88b30761fae22"
// $http.get(uri_moscow)
//     .then(function(data){
//         insertIntoRUSSIATable(data.data);
//         reteriveRussiaData($scope);
//     })

// .
// catch(function (error) {
//     alert(error);
// });

// function insertIntoRUSSIATable(data) {
//     $indexedDB.openStore('RUSSIA', function (store) {
//         store.upsert(data)
//             .then(function (e) {
//                 console.log("inserted in RUSSIA");

//             });
//     });

// }

// function reteriveRussiaData() {
//     $indexedDB.openStore('RUSSIA', function (store) {
//         store.getAll()
//             .then(function (data) {
//                 console.log(data[0]);
//                 $scope.russia_data = data[0];
//             });
//     });
// }

// var uri_shuzenji = "https://samples.openweathermap.org/data/2.5/forecast/hourly?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22"
// $http.get(uri_shuzenji)
//     .then(function(data){
//         insertIntoJAPANTable(data.data);
//         reteriveJAPANData($scope);
//     })

//     .
//     catch(function (error) {
//         alert(error);
//     });

// function insertIntoJAPANTable(data) {
//     $indexedDB.openStore('JAPAN', function (store) {
//         store.upsert(data)
//             .then(function (e) {
//                 console.log("inserted in JAPAN");

//             });
//     });
// }

// function reteriveJAPANData() {
//     $indexedDB.openStore('JAPAN', function (store) {
//         store.getAll()
//             .then(function (data) {
//                 console.log(data[0]);
//                 $scope.japan_data = data[0];
//             });
//     });
// }

// }]);
