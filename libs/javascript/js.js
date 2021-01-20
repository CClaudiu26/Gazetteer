
 const spinOptions =  {
        
    lines: 13,
    length: 0,
    width: 23,
    radius: 61,
    scale: 1.2,
    speed: 1.1,
    rotate: 63,
    animation: "spinner-line-shrink",
    color: "#155799"
};
       


      $.ajax({
        url:'libs/php/select.php',
        type:'POST',
        
        dataType: 'json',
        success: function( result ) {
            $.each(result.data, function(index) {
 
                $('#Searchh').append($("<option>", {
                    value: result.data[index].code,
                    text: result.data[index].name
                })); 
             
            }); 
         
        }
    });
 

    var mymap = L.map('mapid').setView([0, 0], 2 );
   
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);



        var gray = L.layerGroup();


        L.esri.basemapLayer('DarkGray').addTo(gray);
        L.esri.basemapLayer('GrayLabels').addTo(gray);
      
      
      
        var baseLayers = {
          Grayscale: gray,
          Streetmap: L.esri.basemapLayer('Streets')
        };
      
     
        // https://leafletjs.com/reference.html#control-layers
        L.control.layers(baseLayers).addTo(mymap);
     
        //var layerGroup = L.layerGroup().addTo(mymap);

        var extram = L.ExtraMarkers.icon({
                           
            markerColor: 'green',
            prefix: 'icon',
            icon: 'sync',
            iconColor: '#fff',
            iconRotate: 0,
            extraClasses: '',
            number: '',
            svg: false
          });

    

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
           } else { 
            alert("Geolocation is not supported by this browser.");
           }       
    
    function showPosition(position) {
      var lat =  position.coords.latitude; 
        var long =  position.coords.longitude;
    
    
        
    
    
    
       

        $.ajax({
            url: "libs/php/curl.php",
            type: 'POST',
            dataType: 'json',
            data:{
                lat: lat,
                lng: long
            },
    
    
            success: function(result){
                console.log(result);

                $('#Search').val( result['data']['countryName']);

                
                
                mymap.setView([lat,long],9);
                marker = L.marker([lat,long]).addTo(mymap);
                marker.bindPopup("Your Location").openPopup();
                applyCountryBorder(mymap, $('#Search').val());
                

                function applyCountryBorder(map, countryname) {

                      

                    jQuery
                      .ajax({
                        type: "GET",
                        dataType: "json",
                        url:
                          "https://nominatim.openstreetmap.org/search?country=" +
                          countryname.trim() +
                          "&polygon_geojson=1&format=json"
                      })
                      .then(function(data) {

                        /*const latLngs = L.GeoJSON.coordsToLatLngs(data[0].geojson.coordinates,2) 
                        L.polyline(latLngs, {
                          color: "green",
                          weight: 14,
                          opacity: 1
                        }).addTo(map);*/
                        var border;

                   
                       
                       
                          
                        border = L.geoJSON(data[0].geojson, {
                          color: "blue",
                          weight: 1,
                          opacity: 4,
                          
                        }).addTo(map);

                        map.fitBounds(border.getBounds());

                      
                   


                   
           
         
                     
                      });
                  } 

                 
            
                
            }
    
        });
       
 
        
        

    
    
     
        }
      
    
      
   
    
    var lat1, long1;   

   function changeFunc() {
 
    
    mymap.spin(true, spinOptions);

   
   

                $.ajax({
                  
                    url: "libs/php/search.php",
                    type: 'POST',
                    dataType: 'json',
                    data:{
                        country : $("#Search").val()
                    },
                    
                 
            
                    success: function(result){
                        console.log(result);

                      
                      
                       



                        lat1 = result['data'][0]['latlng'][0];
                         long1 = result['data'][0]['latlng'][1];

                       
                         //mymap.setView([lat1,long1],6);
                    
                  
                        

                          
             var greenIcon = L.icon({ //add this new icon
                iconUrl: 'libs/javascript/wiki.png',
            
                iconSize:     [30, 30], 
            
               
            });
                       



                     
                     applyCountryBorder(mymap, $("#Search").val()) ;

                     mymap.spin(false);

                     function applyCountryBorder(map, countryname) {

                      

                        jQuery
                          .ajax({
                            type: "GET",
                            dataType: "json",
                            url:
                              "https://nominatim.openstreetmap.org/search?country=" +
                              countryname.trim() +
                              "&polygon_geojson=1&format=json"
                          })
                          .then(function(data) {
 
                            /*const latLngs = L.GeoJSON.coordsToLatLngs(data[0].geojson.coordinates,2) 
                            L.polyline(latLngs, {
                              color: "green",
                              weight: 14,
                              opacity: 1
                            }).addTo(map);*/
                            var border;

                            
                            map.eachLayer(function(layer) {
                                if (!!layer.toGeoJSON) {
                                  map.removeLayer(layer);
                                }
                              });
                            
                           
                           
                              
                            border = L.geoJSON(data[0].geojson, {
                              color: "blue",
                              weight: 1,
                              opacity: 4,
                              
                            }).addTo(map);

                            map.fitBounds(border.getBounds());

                          
                       



                            $.ajax({

                                url: "libs/php/wiki.php",
                                type: 'POST',
                                dataType: 'json',
                                data:{
                
                                    country : $('#Search').val().replace (/ /g , "%20")
                                },
                                
                              
                                success: function(result){
                                    console.log(result);

                    var popupText1 = '<img src="' + result['data'][4]['thumbnailImg'] + '"</img>';
                    var popupText2 = '<img src="' + result['data'][1]['thumbnailImg'] + '"</img>';
                    var popupText3 = '<img src="' + result['data'][0]['thumbnailImg'] + '"</img>';
                    var popupText4 = '<img src="' + result['data'][2]['thumbnailImg'] + '"</img>';
                    var popupText5 = '<img src="' + result['data'][3]['thumbnailImg'] + '"</img>';
                    var popupText6 = '<img src="' + result['data'][5]['thumbnailImg'] + '"</img>';
                    
                    
                                        
                      marker3 = L.marker([result['data'][4]['lat'],result['data'][4]['lng']], {icon:greenIcon }).addTo(mymap);
                      marker3.bindPopup(popupText1, { maxWidth: "auto"});

                          
                      marker1 = L.marker([result['data'][1]['lat'], result['data'][1]['lng']], {icon:greenIcon }).addTo(mymap);
                      marker1.bindPopup(popupText2, { maxWidth: "auto"});

                          
                      marker2 = L.marker([result['data'][0]['lat'] , result['data'][0]['lng']], {icon:greenIcon }).addTo(mymap);
                      marker2.bindPopup(popupText3, { maxWidth: "auto"});

                      marker4 = L.marker([result['data'][2]['lat'] , result['data'][2]['lng']], {icon:greenIcon }).addTo(mymap);
                      marker4.bindPopup(popupText4, { maxWidth: "auto"});
                

                      marker5 = L.marker([result['data'][3]['lat'] , result['data'][3]['lng']], {icon:greenIcon }).addTo(mymap);
                      marker5.bindPopup(popupText5, { maxWidth: "auto"});


                      marker6 = L.marker([result['data'][5]['lat'] , result['data'][5]['lng']], {icon:greenIcon }).addTo(mymap);
                      marker6.bindPopup(popupText6, { maxWidth: "auto"});
                      
                       
                
                                }
                
                            });
                       
               
             
                         
                          });
                      } 

                   






            

                 


                

                     $('#takecountry').html(result['data'][0]['name']);
                     $('#countryc').html(result['data'][0]['currencies'][0]['name']);

          
            
                     $('#imagepreview').attr('src', " "); 

                     $('#exchangesum').html('');
                     $('#countrycc').html('');

        
          $.ajax({
            url:'libs/javascript/curency.json',
            type:'POST',
            
            dataType: 'json',
            success: function( json ) {
                var key = 0;
                $.each(json, function(i, value) {
                    if (i == result['data'][0]['currencies'][0]['code']){
                        console.log("ney");
                        key = key + 1;
                    }
                });

                if ( key == 0){
                    $('#exchangesum').html(" SORRY, WE DON'T HAVE INFORMATION ABOUT THIS CURENCY");
                }
             
            }
        });

       

                        
                   
                      


                            
                    },

                    
                  
            
                });
            }




            $('#Statistics').click(function() {


             

              $.ajax({
                  url: "libs/php/search.php",
                  type: 'POST',
                  dataType: 'json',
                  data:{
                      country : $("#Search").val()
                  },
                  
                
                  success: function(result){
                      console.log(result);
        
        
        
                      $('#name').html(result['data'][0]['name']);
                      $('#code').html(result['data'][0]['alpha3Code']);
                      $('#capital').html(result['data'][0]['capital']);
                      $('#population').html(result['data'][0]['population']);
                      $('#language').html(result['data'][0]['languages'][0]['name']);
                      $('#region').html(result['data'][0]['region']);
                      $('#subregion').html(result['data'][0]['subregion']);
        
                          
        
        
                          
                  },
                  error: function(){
                    $('#name').html("ney ney");
                  }
          
              });
          });

          $('#flag').click(function() {


 

            $.ajax({
                url: "libs/php/search.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country : $("#Search").val()
                },
                
              
                success: function(result){
                    console.log(result);
      
      
      
                    $('#imagepreview').attr('src', result['data'][0]['flag']); 
                    $('#imagemodal').modal('show'); 
                        
      
      
                        
                }
        
            });
        });

          $('#Timezone').click(function() {
 

            $.ajax({
              
                url: "libs/php/search.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country : $("#Search").val()
                },
                
        
                success: function(result){
                    console.log(result);

                  

                    lat1 = result['data'][0]['latlng'][0];
                     long1 = result['data'][0]['latlng'][1];

                     $.ajax({
                        url: "libs/php/curl.php",
                        type: 'POST',
                        dataType: 'json',
                        data:{
                            lat: lat1,
                            lng: long1
                        },
                
                
                        success: function(result){
                            console.log(result);
                          
                                $('#time').html(result['data']['time']);
                                $('#sunrise').html(result['data']['sunrise']);
                                $('#sunset').html(result['data']['sunset']);
                                $('#zoneid').html(result['data']['timezoneId']);
                        
                            
                        }
                
                    });
                    
                   
                    
               
                  


                        
                }
        
            });
        });


          /*$('#Wikipedia').click(function() {



            $.ajax({
              
                url: "libs/php/search.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country : $("#Search").val()
                },
                
        
                success: function(result){
                    console.log(result);

                  

                    lat1 = result['data'][0]['latlng'][0];
                     long1 = result['data'][0]['latlng'][1];
 

               $.ajax({
                url: "libs/php/wiki.php",
                type: 'POST',
                dataType: 'json',
                data:{

                    lat: lat1,
                    lng: long1
                    
                },
                
              
                success: function(result){
                    console.log(result);


                    $('#summary').html(result['data'][0]['summary']);
                    $('#link').html(result['data'][0]['wikipediaUrl']);


                    $('#summary4').html(result['data'][1]['summary']);
                    $('#link4').html(result['data'][1]['wikipediaUrl']);

                   

                    $('#summary1').html(result['data'][2]['summary']);
                    $('#link1').html(result['data'][2]['wikipediaUrl']);

                    $('#summary2').html(result['data'][3]['summary']);
                    $('#link2').html(result['data'][3]['wikipediaUrl']);

                    $('#summary3').html(result['data'][4]['summary']);
                    $('#link3').html(result['data'][4]['wikipediaUrl']);


      
                        
      
      
                        
                }

            });

            }
        
            });
        });*/

        $('#Wikipedia').click(function() {

           

            $.ajax({

                url: "libs/php/wiki.php",
                type: 'POST',
                dataType: 'json',
                data:{

                    country : $('#Search').val().replace (/ /g , "%20")
                },
                
              
                success: function(result){
                    console.log(result);


                    $('#summary').html(result['data'][1]['summary']);
                    $('#linkwiki').attr('href', " ");
                    
                    $('#linkwiki').attr('href', 'https://' + result['data'][1]['wikipediaUrl']);


                    $('#summary4').html(result['data'][2]['summary']);
                    $('#linkwiki4').attr('href', 'https://' +  result['data'][2]['wikipediaUrl']);

                   

                    $('#summary1').html(result['data'][3]['summary']);
                    $('#linkwiki1').attr('href', 'https://' +  result['data'][3]['wikipediaUrl']);

                    $('#summary2').html(result['data'][4]['summary']);
                    $('#linkwiki2').attr('href', 'https://' +  result['data'][4]['wikipediaUrl']);

                    $('#summary3').html(result['data'][5]['summary']);
                    $('#linkwiki3').attr('href', 'https://' +  result['data'][5]['wikipediaUrl']);

                }

            });

        });



        $('#Weather').click(function() {
 

            $.ajax({
              
                url: "libs/php/search.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country : $("#Search").val()
                },
                
        
                success: function(result){
                    console.log(result);

                  

                    lat1 = result['data'][0]['latlng'][0];
                     long1 = result['data'][0]['latlng'][1];

                     $.ajax({
                        url: "libs/php/weather.php",
                        type: 'POST',
                        dataType: 'json',
                        data:{
                            lat: lat1,
                            lng: long1
                        },
                
                
                        success: function(result){
                            console.log(result);
                          
                                $('#description').html(result['data']['weather'][0]['description']);
                                $('#temperature').html(result['data']['main']['temp']);
                                $('#maxtemperature').html(result['data']['main']['temp_max']);
                                $('#mintemperature').html(result['data']['main']['temp_min']);
                                $('#temperaturelike').html(result['data']['main']['feels_like']);
                                $('#humidity').html(result['data']['main']['humidity']);
                                $('#windspeed').html(result['data']['wind']['speed']);
                        
                            
                        }
                
                    });
                    
                   
                    
               
                  


                        
                }
        
            });
        });

        
        $.ajax({
            url:'libs/javascript/curency.json',
            type:'POST',
            
            dataType: 'json',
            success: function( json ) {
                $.each(json, function(i, value) {
                    $('#myselect').append($('<option>').text(i).attr('value', i));
                });
            }
        });

         
        $.ajax({
            url:'libs/javascript/country.json',
            type:'POST',
            
            dataType: 'json',
            success: function( json ) {
                $.each(json, function(i, value) {
                    $('#Search').append($('<option>').text(value).attr('value', value));
                });
            }
        })





        $('#change').click(function() {
            //$('#exchangesum').html('');
            //$('#countrycc').html('');


            $.ajax({
              
                url: "libs/php/search.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country : $("#Search").val()
                },
                
        
                success: function(result){
                    console.log(result);

                  

                    //lat1 = result['data'][0]['latlng'][0];
                    //long1 = result['data'][0]['latlng'][1];
                    var cur = result['data'][0]['currencies'][0]['code'];
                    

                
                    

                    
                     
                    


 
                 
                        $.ajax({
                            url: "libs/php/curency.php",
                            type: 'POST',
                            dataType: 'json',
                            data:{
                                base : $('#myselect').val(),
                            },
                            
                          
                            success: function(result){

                            
                                console.log(result);
                              
                  
                                    $('#exchangesum').html(result['data']['rates'][cur]*$('#sum').val());
                                    $('#countrycc').html(cur);
                                
                         
                            }
                    
                        });
                       
            

                        
                }
        
            });
        });



         


  
        


       
       

