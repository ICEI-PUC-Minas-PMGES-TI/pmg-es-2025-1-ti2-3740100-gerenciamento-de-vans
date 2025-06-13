import { useEffect, useState } from 'react';
import { APIProvider, Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { Button } from '../button';


type DirectionsMapProps = {
  origem: string;
  destino: string;
  paradas: string[];
};

export default function DirectionsMap({ origem, destino, paradas }: DirectionsMapProps) {
  console.log("API KEY:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  const position = { lat: -19.9167, lng: -43.9345 };
  const [info, setInfo] = useState<{
    summary?: string;
    start?: string;
    end?: string;
    distance?: string;
    duration?: string;
    routes?: { summary: string }[];
    setRouteIndex?: (idx: number) => void;
  }>({});

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative', borderRadius: 'inherit' }}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={position}
          defaultZoom={12}
          fullscreenControl={true}
          fullscreenControlOptions={{ position: window.google.maps.ControlPosition.LEFT_TOP }}
          streetViewControl={false}
          mapTypeControl={false}
        >
          <Directions setInfo={setInfo} origem={origem} destino={destino} paradas={paradas} />
        </Map>

        {info.summary && (
          <div
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'rgba(255,255,255,0.97)',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              padding: 16,
              minWidth: 220,
              zIndex: 10,
              fontSize: 14,
              maxWidth: 320,
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{info.summary}</div>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontWeight: 500 }}>{info.start}</span> → <span style={{ fontWeight: 500 }}>{info.end}</span>
            </div>
            <div style={{ marginBottom: 4 }}>Distância: <b>{info.distance}</b></div>
            <div style={{ marginBottom: 8 }}>Tempo estimado: <b>{info.duration}</b></div>
            {info.routes && info.routes.length > 1 && (
              <div>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>Outras Rotas Disponíveis:</div>
                <ul style={{ paddingLeft: 16, margin: 0 }}>
                  {info.routes.map((route, idx) => (
                    <li key={route.summary}>
                      <Button variant="link" onClick={() => info.setRouteIndex?.(idx)}>
                        {route.summary}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </APIProvider>
    </div>
  );
}

function Directions({ setInfo, origem, destino, paradas }: {
  setInfo: (info: any) => void
  origem: string;
  destino: string;
  paradas: string[];

}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] = useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState<number>(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

    function geocodeByPlaceId(placeId: string): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!map) return reject("Mapa não disponível");
      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails(
        { placeId, fields: ['geometry'] },
        (result, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            result?.geometry?.location
          ) {
            resolve({
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
            });
          } else {
            reject(new Error("Place ID não encontrado: " + placeId));
          }
        }
      );
    });
  }

  // Função para ordenar paradas por distância da origem
  async function ordernarParadas(origemPlaceId: string, destinosPlaceIds: string[]) {
    if (!map) return { destinoFinal: "", paradasOrdenadas: [] };
    const origemLoc = await geocodeByPlaceId(origemPlaceId);
    const destinosLocs = await Promise.all(
      destinosPlaceIds.map(async (placeId) => {
        try {
          return {
            placeId,
            location: await geocodeByPlaceId(placeId),
          };
        } catch (e) {
          return null;
        }
      })
    );
    const destinosComDistancia = destinosLocs
      .filter((dest): dest is { placeId: string; location: { lat: number; lng: number } } => dest !== null)
      .map((dest) => ({
        ...dest,
        distancia: google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(origemLoc.lat, origemLoc.lng),
          new google.maps.LatLng(dest.location.lat, dest.location.lng)
        ),
      }));
    destinosComDistancia.sort((a, b) => a.distancia - b.distancia);
    const destinoFinal = destinosComDistancia[destinosComDistancia.length - 1]?.placeId || "";
    const paradasOrdenadas = destinosComDistancia.slice(0, -1).map((dest) => dest.placeId);
    return { destinoFinal, paradasOrdenadas };
  }


  useEffect(() => {
    if (!map || !routesLibrary) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionService || !directionRenderer) return;
    if (!origem || !destino) return; 
    console.log("Directions params:", {
      origem,
      destino,
      paradas
    });

    directionService
      .route({
        origin: { placeId: origem },
        destination: { placeId: destino },
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        waypoints: paradas.map((p) => ({
          location: { placeId: p },
          stopover: true,
        }))
      })
      .then((response) => {
        directionRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionService, directionRenderer, destino, paradas]);

  useEffect(() => {
    if (!directionRenderer || !routes.length) return;
    directionRenderer.setRouteIndex?.(routeIndex);
  }, [directionRenderer, routes, routeIndex]);

  useEffect(() => {
    if (!leg) return;
    setInfo({
      summary: selected.summary,
      start: leg.start_address.split(",")[0],
      end: leg.end_address.split(",")[0],
      distance: leg.distance?.text,
      duration: leg.duration?.text,
      routes,
      setRouteIndex,
    });
  }, [leg, selected, routes, setRouteIndex, setInfo]);

  return null;
}