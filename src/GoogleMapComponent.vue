<template>
  <GoogleMap
    :api-key="import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="4"
  >
    <GoogleMapMarker :options="{ position: center }">
      <InfoWindow>
        <div id="contet">
          <div id="siteNotice" />
          <h1 id="firstHeading" class="firstHeading">Uluru</h1>
          <div id="bodyContent">
            <p>
              <b>Uluru</b>
              , also referred to as
              <b>Ayers Rock</b>
              , is a large sandstone rock formation in the southern part of the Northern
              Territory, central Australia. It lies 335&#160;km (208&#160;mi) south west
              of the nearest large town, Alice Springs; 450&#160;km (280&#160;mi) by road.
              Kata Tjuta and Uluru are the two major features of the Uluru - Kata Tjuta
              National Park. Uluru is sacred to the Pitjantjatjara and Yankunytjatjara,
              the Aboriginal people of the area. It has many springs, waterholes, rock
              caves and ancient paintings. Uluru is listed as a World Heritage Site.
            </p>
            <p>
              Attribution: Uluru,
              <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">
                https://en.wikipedia.org/w/index.php?title=Uluru
              </a>
              (last visited June 22, 2009).
            </p>
          </div>
        </div>
      </InfoWindow>
    </GoogleMapMarker>
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker as GoogleMapMarker, InfoWindow } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, GoogleMapMarker, InfoWindow },
  setup() {
    const coords = { latitude: 63.8411803, longitude: 20.1611222 }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        coords.latitude = pos.coords.latitude
        coords.longitude = pos.coords.longitude
      })
    }

    const center = { lat: coords.latitude, lng: coords.longitude }

    return { center }
  },
})
</script>
