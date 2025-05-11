import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export const MapLibre = ({
    width = '100%',
    height = '400px',
    center = [80.6217481, 16.4405405],
    zoom = 14,
    markers = [],
    onClick,
    className = ''
}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const markerRefs = useRef({});

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://demotiles.maplibre.org/style.json',
            center: center,
            zoom: zoom
        });

        map.current.on('load', () => {
            setMapLoaded(true);
        });

        if (onClick) {
            map.current.on('click', (e) => {
                onClick({
                    lng: e.lngLat.lng,
                    lat: e.lngLat.lat
                });
            });
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    // Handle markers
    useEffect(() => {
        if (!mapLoaded || !map.current) return;

        // Clear existing markers
        Object.values(markerRefs.current).forEach(marker => marker.remove());
        markerRefs.current = {};

        // Add new markers
        markers.forEach((marker, index) => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = marker.type === 'destination'
                ? 'url(https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png)'
                : 'url(https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png)';
            el.style.width = '30px';
            el.style.height = '30px';
            el.style.backgroundSize = '100%';
            el.style.cursor = 'pointer';

            if (marker.label) {
                const tooltip = document.createElement('div');
                tooltip.className = 'marker-tooltip';
                tooltip.textContent = marker.label;
                tooltip.style.position = 'absolute';
                tooltip.style.bottom = '30px';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.backgroundColor = 'white';
                tooltip.style.padding = '2px 5px';
                tooltip.style.borderRadius = '3px';
                tooltip.style.fontSize = '12px';
                tooltip.style.whiteSpace = 'nowrap';
                tooltip.style.pointerEvents = 'none';
                tooltip.style.opacity = '0';
                tooltip.style.transition = 'opacity 0.2s';
                el.appendChild(tooltip);

                el.addEventListener('mouseenter', () => {
                    tooltip.style.opacity = '1';
                });
                el.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                });
            }

            const newMarker = new maplibregl.Marker(el)
                .setLngLat([marker.lng, marker.lat])
                .addTo(map.current);

            markerRefs.current[index] = newMarker;
        });
    }, [markers, mapLoaded]);

    return (
        <div
            ref={mapContainer}
            className={`map-container rounded-xl overflow-hidden ${className}`}
            style={{ width, height }}
        />
    );
};
