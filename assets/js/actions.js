/* Interactive Map
/* Dave Smith 2013 September 16
*/

SC.initialize({
  client_id: 'e922ed0ef3d66bc7e71356a77447ee68'
});
// find all sounds of buskers licensed under 'creative commons share alike'
//SC.get('/tracks', { q: '', license: 'cc-by-sa'}, function(tracks) {
SC.get('/tracks', { q: 'geo:lat', tags:'' }, function(tracks) {
  input.markers = getMarkers(tracks);
  console.log(input.markers.length);
  start();
});
/*
    soundcloud:source=iphone-record
    geo:lat=53.348809
    geo:lon=-6.273492 
*/
var getMarkers = function(tracks) {

    var tracksLength = tracks.length
    ,   track
    ,   i
    ,   latReg = /geo:lat=([0-9.-]+)/
    ,   lonReg = /geo:lon=([0-9.-]+)/
    ,   markers = []
    ;
    
    for (i = 0; i < tracksLength; i += 1) {

        track = tracks[i];

        lon = track.tag_list.match(lonReg);
        lat = track.tag_list.match(latReg);
        
        if (lat && lat.length > 1 && lon && lon.length > 1) {
            markers.push(
                {
                    title: track.title
                ,   lat: lat[1]
                ,   lng: lon[1]
                ,   infoWindowContent: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url='+encodeURI(track.uri)+'"></iframe>'
                }
            );
            
        }
    }
    
    return markers;
    
};
(function(context){
    
    
    // VARIABLES
    
    // Config
    var input = {
            map: {
                center: {
                    lat: 53.349805,
                    lng: -6.260310            
                },
                zoom: 1,
                disableDefaultUI: false,
				disableDoubleClickZoom: false,
				scrollwheel: false,
                style: {
                    funky: {
                        id: 'funky_style',
                        styledMapOptions: {
                            name: 'Funky Style'
                        },
                        featureOptions: [
                            {
                                stylers: [
                                    {hue: '#E5F3F6' },
                                    {visibility: 'simplified' },
                                    {gamma: 0.9 },
                                    {weight: 0.7 }
                                ]
                            },
                            {
                                elementType: 'labels',
                                stylers: [
                                    {visibility: 'on'}
                                ]
                           },
                            {
                                featureType: 'water',
                                stylers: [
                                    {color: '#F3FEFF'}
                                ]
                            },
							{
								featureType: "road",
								elementType: "labels",
								stylers: [
									{ visibility: "off" }
								]
							},
							{
								featureType: "road",
								elementType: "geometry",
								stylers: [
									{ visibility: "off" }
								]
							}
                        ]
                    }
                }
            },
            markers: [],
            icons: {
                icon1: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        // This marker is 20 pixels wide by 32 pixels tall.
                        size: new google.maps.Size(50, 50),
                        // The origin for this image is 0,0.
                        origin: new google.maps.Point(0,0),
                        // The anchor for this image is the base of the flagpole at 0,32.
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        // This marker is 20 pixels wide by 32 pixels tall.
                        size: new google.maps.Size(50, 50),
                        // The origin for this image is 0,0.
                        origin: new google.maps.Point(50,0),
                        // The anchor for this image is the base of the flagpole at 0,32.
                        anchor: new google.maps.Point(25, 25)
                    }
                    // shadow: {
                    //     url: 'images/beachflag_shadow.png',
                    //     // The shadow image is larger in the horizontal dimension
                    //     // while the position and offset are the same as for the main image.
                    //     size: new google.maps.Size(37, 32),
                    //     origin: new google.maps.Point(0,0),
                    //     anchor: new google.maps.Point(0, 32)
                    // },
                    // // Shapes define the clickable region of the icon.
                    // // The type defines an HTML &lt;area&gt; element 'poly' which
                    // // traces out a polygon as a series of X,Y points. The final
                    // // coordinate closes the poly by connecting to the first
                    // // coordinate.
                    // shape: {
                    //     coord: [1, 1, 1, 20, 18, 20, 18 , 1],
                    //     type: 'poly'
                    // }
                },
                icon2: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,50),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,50),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon3: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,100),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,100),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon4: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,150),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,150),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon5: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,200),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,200),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon6: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,250),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,250),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon7: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,300),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,300),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon8: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,350),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,350),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon9: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,400),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,400),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon10: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,450),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,450),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon11: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,500),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,500),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon12: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,550),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,550),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon13: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,600),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,600),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon14: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,650),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,650),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon15: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,700),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,700),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon16: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,750),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,750),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon17: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,800),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,800),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon18: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,850),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,850),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon19: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,900),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,900),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon20: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,950),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,950),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon21: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,1000),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,1050),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon22: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,1100),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,1100),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon23: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,1150),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,1150),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon24: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,1200),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,1200),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                },
                icon25: {
                    image: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(0,1250),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    },
                    imageHover: {
                        url: 'https://www.tcd.ie/webdesign-projects/preview/mauramap/assets/icons/icons.png',
                        origin: new google.maps.Point(50,1250),
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                }
            }
        },
        map,
        start
    ;

    


    // ACTIONS
	// Cool cats stay above this point :D
    
    start = function() {
        
        var mapOptions = {
            zoom: input.map.zoom,
			disableDoubleClickZoom: input.map.disableDoubleClickZoom,
			scrollwheel: input.map.scrollwheel,
            center: new google.maps.LatLng(input.map.center.lat, input.map.center.lng),
            mapTypeControlOptions: {
                mapTypeIds: [
                    google.maps.MapTypeId.ROADMAP,
                    input.map.style.funky.id
                ]
            },
            mapTypeId: input.map.style.funky.id,
            disableDefaultUI: input.map.disableDefaultUI || false

        };
        
        map = new google.maps.Map(
            document.getElementById('map-canvas'),
            mapOptions
        );
        
        // Add custom map style
        map.mapTypes.set(input.map.style.funky.id, new google.maps.StyledMapType(input.map.style.funky.featureOptions, input.map.style.funky.styledMapOptions));
        
        // Add a KML Layer
        //var kmlLayer = new google.maps.KmlLayer({
        //    url: 'https://www.google.ie/maps/ms?authuser=0&vps=2&hl=en&ie=UTF8&msa=0&output=kml&msid=205969672886635036669.00046b828a5074127c5f0',
        //    //url: 'http://www.tcd.ie/webdesign-proects/preview/mauramap/assets/kml/places.kml',
        //    suppressInfoWindows: false,
        //    map: map
        //});

        // Or add own markers or both?
        addMarkers();
        
        google.maps.event.addListener(map, 'bounds_changed', function() {
            var bounds
            ,   ne
            ,   sw
            ;
            
            bounds = map.getBounds();
            ne = bounds.getNorthEast();
            sw = bounds.getSouthWest();
            
console.log(ne.lat() + ' ' + ne.lng());
console.log(sw.lat() + ' ' + sw.lng());
        });

    };
    
    addMarkers = function() {
    
        markersLength = input.markers.length;
        for (i = 0; i < markersLength; i++) {
        
console.log(input.markers[i].lat + ' ' + input.markers[i].lng);
        
            (function(i) {
            
                var latLng
                ,   icon
                ,   markerOptions
                ,   marker
                ,   infoWindowOptions
                ,   infoWindow
                ;
                
                latLng = new google.maps.LatLng(input.markers[i].lat, input.markers[i].lng);
                
                icon = input.icons[input.markers[i].icon] || false;
                
                // Marker Options
                options = {
                    position: latLng,
                    map: map,
                    title: input.markers[i].title
                }
                if (icon) {
                    options.icon = icon.image;
                }
    
                // Create Marker
                marker = new google.maps.Marker(options);
                
                (function(marker) {
                
                    if (input.markers[i].infoWindowContent) {
                    
                        // Info Window Options
                        infoWindowOptions = {
                            content: input.markers[i].infoWindowContent || 'default'
                        };
                        
                        // Create Info Window
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        
                        google.maps.event.addListener(marker, 'click', function() {
                            infoWindow.open(map, marker);
                        });
        
                    }
                    
                    // Event Handling
                    if (icon && icon.imageHover) {
                        google.maps.event.addListener(marker, 'mouseover', function() {
                            this.setIcon(icon.imageHover);
                            this.setZIndex(9);
                        });
                        google.maps.event.addListener(marker, 'mouseout', function() {
                            this.setIcon(icon.image);
                            this.setZIndex(9);
                        });
                    }
                    
                    // Add a custom popup window/modal for each marker that is linked
                    (function(i) {
        				if (input.markers[i].hasOwnProperty('link')) {
        					google.maps.event.addListener(marker, 'click', function(event) {
        						event.stop();
        						event.cancelBubble = true;
        						if (event.stopPropagation) {
        							event.stopPropagation();
        						}
        						if (event.preventDefault) {
        							event.preventDefault(); 
        						} else {
        							event.returnValue = false;  
        						}
        						
        						$(function() {
                                    var $popupPlaceholder = $('.popup-placeholder')
                                    ,   $popupPlaceholderContent = $('.popup-placeholder-content')
                                    ;
                                    
        							$popupPlaceholderContent.load(input.markers[i].link + ' #article', function() {
        								$popupPlaceholder.addClass('popup-placeholder-active');
        							});
        						});
        					});
        				}
                    }(i));
    			
                }(marker));
                
            }(i));
        }
    }
    closePopup = function() {
		$('.popup-placeholder').removeClass('popup-placeholder-active');
	};


    context.start = start;
    context.input = input;

    // EVENT BINDING
    
    // On DOM Load
    $(function(){
        //start();
		addCloseButtonToPopupPlaceholder();
    });
	
	addCloseButtonToPopupPlaceholder = function() {
 	
    	var html = ''
    	,    $popupPlaceholderHeader = $('.popup-placeholder-header')
    	;
    	html += '<p><a tabindex="0" class="close-button">x</a></p>';
    	var $closeButton = $(html).appendTo($popupPlaceholderHeader);
    	$closeButton.on('click', function() {
        	closePopup();
    	});
   	
	};
	
	// Remove the popup window/modal when clicking anywhere but the window
	$(document).on('click', function(e) {
		var target = e.target;
		if ($(target).closest('.popup-placeholder-inner').length === 0) {
			closePopup();
		}
	});
	$(document).on('keyup', function(e) {
		if (e.which === 27) {
			closePopup();
		}
	});

}(window));