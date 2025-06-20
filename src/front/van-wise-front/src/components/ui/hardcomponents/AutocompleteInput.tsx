"use client"

import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api'
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../input';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface Props {
  onPlaceSelected: (place: { formatted_address: string; place_id: string }) => void;
}

export function AutocompleteInput({ onPlaceSelected }: Props) {
  useMapsLibrary('places');

  async function handlePlaceSelected(place: any) {
    const placeId = place.id || place.place_id;
    if (!placeId) {
      console.error('No placeId found');
      return;
    }
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(
      {
        placeId,
        fields: ['formatted_address', 'place_id'],
        language: 'pt-BR',
      },
      (result: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && result?.formatted_address) {
          console.log(result);
          onPlaceSelected({ 
            formatted_address: result.formatted_address,
            place_id: result.place_id
           });
        } else {
          console.error('Erro ao buscar detalhes do lugar', status, result);
        }
      }
    );
  }

  return (
    <div className='autocomplete-input-container'>
      <gmp-place-autocomplete
        ongmp-select={(ev: any) =>
          void handlePlaceSelected(ev.placePrediction.toPlace())
        }
        ongmp-placeselect={(ev: any) => void handlePlaceSelected(ev.place)}
      />

    </div>
  );

};


  declare module 'react' {
    namespace JSX {
      interface IntrinsicElements {
        'gmp-place-autocomplete': React.DetailedHTMLProps<
          React.HTMLAttributes<google.maps.places.PlaceAutocompleteElement>,
          google.maps.places.PlaceAutocompleteElement
        >;
      }
    }

  }