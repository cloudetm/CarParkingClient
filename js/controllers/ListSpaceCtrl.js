parkease.controller('ListSpaceCtrl',['$scope','$location','$http', 'ngDialog', '$route' ,function($scope,$location,$http, ngDialog, $route) {
	$scope.isFormEnabled = true;
	$scope.isMapEnabled = false;

	$scope.map = undefined;
	$scope.iw = undefined;
	$scope.gmarkers = [];

	$scope.formData = {
		firstName: '',
		lastName: '',
		mobile: '',
		password: '',
		address: '',
		slots: -1,
		rent: 100,
		fits: 0,
		on: {
			mon: false,
			tue: false,
			wed: false,
			thr: false,
			fri: false,
			sat: false,
			sun: false
		},
		from: '',
		to: ''
	};

	$scope.loadPopup = function(selectedIndex) {

		$scope.selectedIndex = selectedIndex;
		//Need to load popup..
		$scope.dialog = ngDialog.open({ 
	    	template: 'registrationModal',
	    	scope: $scope,
	    	id: 'registrationDialog'
	    });
	};

	$scope.signUp = function() {
		$http.get('data/regSuccess.json', $scope.formData).success(function(response){
			if(response.data.success) {
				ngDialog.close($scope.dialog.id);
				$location.url('goldmine');
			}
 		}).error(function(){
			alert('Error')
		});
	};
	$scope.createMarker = function(point, top, left, name, i) {
		var g = google.maps;
		var base = "http://sites.google.com/site/mxamples/icons-dot.png";
		
		var image = { 
			url: base,
			size: new g.Size(32, 32),
			origin: new g.Point(top, left),
			anchor: new g.Point(15, 32) 
		};

		/* shadows are deprecated since API version 3.14
		var shadow = { url: base,
		size: new g.Size(59, 32),
		origin: new g.Point(192, 32),
		anchor: new g.Point(15, 32) };
		*/
		var marker = new g.Marker({ 
			position: point,
			map: $scope.map, 
			title: name, 
			clickable: true,
			draggable: false, 
			icon: image,
			index: i
		});

		//var html ="<div class='infowindow' ng-controller='ListSpaceCtrl'>" +
		//"<span style='font-weight:bold'>"+ name + "<\/span>" +
		//"<p><a href='javascript:void(0)' onClick='captureRegistrationData(" + i + ")'>Show next marker<\/a>" +
		//"<\/p><\/div>";

		// Store markers content as property of gmarkers
		//marker.content = html;
		$scope.gmarkers.push(marker);

		g.event.addListener(marker, "click", function() {
			//$scope.iw.setContent(marker.content);
			//$scope.iw.open($scope.map, this);
			$scope.loadPopup(this.index);
		});
	};

	$scope.toggleAndLoadMap = function() {
		$scope.isFormEnabled = !$scope.isFormEnabled
		$scope.isMapEnabled = !$scope.isMapEnabled

		/*$scope.dialog  = ngDialog.open({ 
	    	template: 'registrationModal',
	    	scope: $scope
	    });*/

		var g = google.maps;

		var data = [ // Data of points and coords of sprite icons
			{ name:"Germany", lat:"51.179342", lng:"10.50292", top: 64, left: 32 },
			{ name:"Netherlands", lat:"52.54963", lng:"6.29516", top: 0, left: 0 },
			{ name:"Belgium", lat:"50.84854", lng:"4.3517", top: 96, left: 0 },
			{ name:"France", lat:"46.69466", lng:"2.48291", top: 32, left: 0 },
			{ name:"Austria", lat:"47.591346", lng:"14.545898", top: 0, left: 32 }
		];

		$scope.points = data;

		var opts_map = {
			center: new g.LatLng(50, 8),
			zoom: 5,
			mapTypeId: g.MapTypeId.ROADMAP,
			scaleControl: true,
			streetViewControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [ g.MapTypeId.ROADMAP, g.MapTypeId.SATELLITE, g.MapTypeId.TERRAIN]
			}
		};
		$scope.map = new g.Map(document.getElementById("regMapContainer"), opts_map);
		$scope.iw = new g.InfoWindow();
		// v2 behaviour
		g.event.addListener($scope.map, "click", function() {
			if ($scope.iw) $scope.iw.close();
		});

		// Load all markers
		for (var i = 0, n; n = data[i]; i++) {
			var point = new g.LatLng(parseFloat(n.lat), parseFloat(n.lng));
			$scope.createMarker(point, n.top, n.left, n.name, i);
		}
	}

	$scope.toggleForm = function() {
		$scope.isFormEnabled = !$scope.isFormEnabled
		$scope.isMapEnabled = !$scope.isMapEnabled
	}
}]);