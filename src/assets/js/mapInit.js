
var drawingManager;
var selectedShape;
var colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
var selectedColor;
var colorButtons = {};
var markers = [];
var polygonArea;
var polyline;

var pos = {};


function clearSelection() {
  if (selectedShape) {
    // selectedShape.setEditable(false);
    selectedShape = null;
  }
}

function setSelection(shape) {
  clearSelection();
  selectedShape = shape;
  // shape.setEditable(true);
  // selectColor(shape.get('fillColor') || shape.get('strokeColor'));
  google.maps.event.addListener(shape.getPath(), 'set_at', calcar);
  google.maps.event.addListener(shape.getPath(), 'insert_at', calcar);
}

function calcar() {
    var area = google.maps.geometry.spherical.computeArea(selectedShape.getPath());
    document.getElementById("geotag-area").innerHTML = "Area = " + (area*0.00024711).toFixed(4) + " acres";
}

function deleteSelectedShape() {
  if (selectedShape) {
    selectedShape.setMap(null);
  }
  drawingManager.setOptions({
    drawingControl: true
  });
  document.getElementById("geotag-area").innerHTML = null;
  document.getElementById("geotag-latlang").innerHTML = null;
}

function selectColor(color) {
  selectedColor = color;
  for (var i = 0; i < colors.length; ++i) {
    var currColor = colors[i];
    colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
  }

  // Retrieves the current options from the drawing manager and replaces the
  // stroke or fill color as appropriate.
  // var polylineOptions = drawingManager.get('polylineOptions');
  // polylineOptions.strokeColor = color;
  // drawingManager.set('polylineOptions', polylineOptions);

  var rectangleOptions = drawingManager.get('rectangleOptions');
  rectangleOptions.fillColor = color;
  drawingManager.set('rectangleOptions', rectangleOptions);

  var circleOptions = drawingManager.get('circleOptions');
  circleOptions.fillColor = color;
  drawingManager.set('circleOptions', circleOptions);

  var polygonOptions = drawingManager.get('polygonOptions');
  polygonOptions.fillColor = color;
  drawingManager.set('polygonOptions', polygonOptions);
}

function setSelectedShapeColor(color) {
  if (selectedShape) {
    if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
      selectedShape.set('strokeColor', color);
    } else {
      selectedShape.set('fillColor', color);
    }
  }
}

function makeColorButton(color) {
  var button = document.createElement('span');
  button.className = 'color-button';
  button.style.backgroundColor = color;
  google.maps.event.addDomListener(button, 'click', function() {
    selectColor(color);
    setSelectedShapeColor(color);
  });

  return button;
}

function buildColorPalette() {
  var colorPalette = document.getElementById('color-palette');
  for (var i = 0; i < colors.length; ++i) {
    var currColor = colors[i];
    var colorButton = makeColorButton(currColor);
    // colorButton.style = "padding-left: 20px;";
    colorPalette.appendChild(colorButton);
    colorButtons[currColor] = colorButton;
  }
  selectColor(colors[0]);
}

function initialize(latLongStr) {
  var centerPoint;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("ACCURACY");
      console.log(position.coords.accuracy);
      centerPoint = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);       
      console.log(centerPoint);     

      //INITIALZE MAP
      var map = new google.maps.Map(document.getElementById('map_tag'), {
        zoom: 20,
        center:centerPoint ,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        disableDefaultUI: true,
        zoomControl: true
      });

      //SERACH PLACES
      initAutocomplete(map);
      
      //DRAW MODE
      (document.getElementById('draw_button')).addEventListener("click",function(){
        (document.getElementById('walk_button')).disabled = true;
        initializeDraw(map,centerPoint);
      });
      
      //WALK MODE
      (document.getElementById('walk_button')).addEventListener("click",function(){
        (document.getElementById('draw_button')).disabled = true;
        (document.getElementById('add-marker')).hidden = false;
        (document.getElementById('calculate-area')).hidden = false;
        (document.getElementById('remove-marker')).hidden = false;
       
      });

      // ----------  WALK MODE EVENTS -------------
      
      if (navigator.geolocation) {          

        navigator.geolocation.watchPosition(function (position) {
          pos["lat"]  =  position.coords.latitude;
          pos["log"]  =  position.coords.longitude;
          pos["acc"]  =  position.coords.accuracy;
          console.log(pos);
        },
        function error(msg) {alert('Please enable your GPS position feature.');
        },
        {
          frequency: 10000,
          enableHighAccuracy: true
        });      
      }

      //POLYLINE WALK MODE
      polyline = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      polyline.setMap(map);
    
      //ADD MARKER FOR WALK MODE
      (document.getElementById('add-marker')).addEventListener("click",function(){
        
        var currLoc = new google.maps.LatLng(pos.lat, pos.log);      
        //DRAW LINE
        var polylinepath = polyline.getPath();
        polylinepath.push(currLoc);
  
        var image = 'http://maps.google.com/mapfiles/ms/icons/red.png';  //tree.png //blue-pushpin
        var marker = new google.maps.Marker({
            position:currLoc, 
            map: map,
            icon : image,
        });
        markers.push(marker);
     });
      
      // CALCULATE AREA FOR WALK
      (document.getElementById('calculate-area')).addEventListener("click",function(){
        var polylinepath = polyline.getPath();
        polylinepath.clear();
        var polygonCoords = [];
        
        for  (var i = 0; i < markers.length; i++) {
          polygonCoords.push({lat: markers[i].position.lat(), lng: markers[i].position.lng()})
        }
        
      
        // CONSTRUCT POLYGON
        polygonArea = new google.maps.Polygon({
          paths: polygonCoords,
          strokeColor: '#000000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#000000',
          fillOpacity: 0.35
        });
        polygonArea.setMap(map);
        var area = google.maps.geometry.spherical.computeArea(polygonArea.getPath());
        document.getElementById("geotag-area").innerHTML = "Area = " + (area*0.00024711).toFixed(4) + " acres";
        var latlongStr = "";
        latlongStr = latlongStr+(area*0.00024711).toFixed(4)+"/";
        for (var i = 0; i < polygonArea.getPath().getLength(); i++) {
          if(i == (polygonArea.getPath().getLength() -1) ){
            latlongStr += polygonArea.getPath().getAt(i).toUrlValue(6);
          }
          else{
            latlongStr += polygonArea.getPath().getAt(i).toUrlValue(6) + "/";
          }
          
        }
        document.getElementById("geotag-latlang").innerHTML = latlongStr; 
      });  
      
      google.maps.event.addDomListener(document.getElementById('remove-marker'), 'click', deleteMarkers);
     
    });      
  }   
}

function initializeDraw(map,centerPoint){
  var marker = new google.maps.Marker({position: centerPoint, map: map});
  markers.push(marker);

  //POLYGON OPTIONS
  var polyOptions = {
    strokeWeight: 0,
    fillOpacity: 0.45,
    editable: true,
  };
        
  //INITIALZE DRAWING MANAGER
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT,
      drawingModes: ['polygon']
      // drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    },
    polygonOptions: polyOptions,
    map: map
  });

  // Clear the current selection when the drawing mode is changed, or when the map is clicked.
  google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
  google.maps.event.addListener(map, 'click', clearSelection);
  google.maps.event.addDomListener(document.getElementById('remove-marker'), 'click', deleteMarkers);
  // buildColorPalette();

  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
    (document.getElementById('remove-marker')).hidden = false;
    if (e.type != google.maps.drawing.OverlayType.MARKER) {
      // Switch back to non-drawing mode after drawing a shape.
      drawingManager.setDrawingMode(null);
      drawingManager.setOptions({
        drawingControl: false
      });
  
      // Add an event listener that selects the newly-drawn shape when the user mouses down on it.
      var newShape = e.overlay;
      newShape.type = e.type;
      google.maps.event.addListener(newShape, 'click', function() {
        setSelection(newShape);
      });
      
      newShape.getPaths().forEach(function(path, index){

        google.maps.event.addListener(path, 'insert_at', function(e){
          console.log("INSERT");
          calcAreaCoOrdinates(newShape);
        });
      
        google.maps.event.addListener(path, 'remove_at', function(e){
          console.log("REMOVED");
          calcAreaCoOrdinates(newShape);
        });
      
        google.maps.event.addListener(path, 'set_at', function(e){
          console.log("MOVED");
          calcAreaCoOrdinates(newShape);
        });
      
      });

      calcAreaCoOrdinates(newShape);
      
    }
  });

}

function calcAreaCoOrdinates(newShape){

  var area = google.maps.geometry.spherical.computeArea(newShape.getPath());
  document.getElementById("geotag-area").innerHTML = "Area = " + (area*0.00024711).toFixed(4) + " acres";
  
  var latlongStr = "";
  latlongStr = latlongStr+(area*0.00024711).toFixed(4)+"/";
  for (var i = 0; i < newShape.getPath().getLength(); i++) {
    if(i == (newShape.getPath().getLength() -1) ){
      latlongStr += newShape.getPath().getAt(i).toUrlValue(6);
    }
    else{
      latlongStr += newShape.getPath().getAt(i).toUrlValue(6) + "/";
    }
    
  }
  document.getElementById("geotag-latlang").innerHTML = latlongStr; 
  setSelection(newShape);      
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  
  //Delete Polyline
  if (polyline != undefined){    
    var polylinepath = polyline.getPath();
    polylinepath.clear();
  }

  //Delete Polygon
  if(polygonArea != undefined){
    var polygonpath = polygonArea.getPath();
    polygonpath.clear();
  }
  
  //Clear Map
  setMapOnAll(null); 
    
  //Delete markers
  markers = []; 

  if (selectedShape) {
    selectedShape.setMap(null);
  }
  
  //Set area null
  (document.getElementById("geotag-area")).innerHTML = null;
  
  (document.getElementById('walk_button')).disabled = false;
  (document.getElementById('draw_button')).disabled = false;
  
  (document.getElementById('add-marker')).hidden = true;
  (document.getElementById('calculate-area')).hidden = true;
  (document.getElementById('remove-marker')).hidden = true;
}

// ********HIDE ALL MARKERS **************
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// ********EDIT MODE**************
// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}


function initAutocomplete(map) {

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}