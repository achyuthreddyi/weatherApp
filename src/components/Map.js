import React from 'react'
import './Map.css'
import { Map as LeafletMap , Marker,  TileLayer, Popup } from 'react-leaflet'

function Map( { center, zoom = 10 } ) {
    const position = [center.lat, center.lng]
    
    return (
            <div className="map">
                <LeafletMap center= {center} zoom={zoom} >
                
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">Achyuth</a> contributors'
                    /> 
                       <Marker position={position}>
                            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                        </Marker>             
                                        
                </LeafletMap>
            </div>
    ) 
    
}

export default Map
