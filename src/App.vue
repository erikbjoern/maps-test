<template>
  <div class="grid grid-cols-3">
    <div class="col-span-2">
      <div id="map" ref="mapRef" />
    </div>
    <div class="flex h-full w-full flex-col bg-sky-500">
      <h1
        class="font-display my-6 flex w-full justify-center gap-x-px text-5xl text-sky-50"
      >
        <span
          v-for="(char, i) in 'majwej' || 'majway' || 'mymaj'"
          :key="i"
          class="leading-none"
          :style="{ transform: char === 'w' ? 'scaleY(-1) translateY(-0.6rem)' : '' }"
          v-text="char === 'w' ? 'm' : char"
        />
      </h1>
      <hr class="mx-10 border-sky-300" />
    </div>
  </div>
  <div ref="vNode">
    <button @click="alert" />
    <p>this is a node</p>
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, reactive, ref } from 'vue'
import tt, { LngLat, Map } from '@tomtom-international/web-sdk-maps'
import { onLongPress } from '@vueuse/core'
import NestedDomContent from './components/NestedDomContent.vue'

type Coords = {
  latitude: number
  longitude: number
}
type GeoPosition = [number, number]

let initialLocation: GeoPosition = [20.1611222, 63.8411803]
const getLngLatTuple = (c: Coords): GeoPosition => [c?.longitude, c?.latitude]

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    initialLocation = getLngLatTuple(coords)
  })
}

const enabledActions = {
  markerPlacement: false,
}

const latestEventData = reactive<{
  mapClick: tt.MapMouseEvent<'mousedown'> | tt.MapTouchEvent<'touchstart'> | null
}>({
  mapClick: null,
})

const map = ref<Readonly<Map>>()
const mapRef = ref<HTMLElement>(null as unknown as HTMLElement)
onMounted(() => {
  map.value = Object.freeze(
    tt.map({
      center: initialLocation,
      container: mapRef.value,
      key: import.meta.env.VITE_APP_TOMTOM_API_KEY,
      zoom: 12,
    })
  )
  map.value.addControl(new tt.FullscreenControl())
  map.value.addControl(new tt.NavigationControl())
  map.value.on('touchstart', mapClickEvent => (latestEventData.mapClick = mapClickEvent))
  map.value.on('mousedown', mapClickEvent => {
    latestEventData.mapClick = mapClickEvent
    enabledActions.markerPlacement = true
  })
  map.value.on('dragstart', () => {
    enabledActions.markerPlacement = false
  })

  addMarker(map.value)
})

onLongPress(mapRef, () => {
  const mapClickEventData = latestEventData.mapClick

  if (!mapClickEventData || !map.value) return

  if (enabledActions.markerPlacement) {
    new tt.Marker().setLngLat(mapClickEventData.lngLat).addTo(map.value)
  }
})

const vNode = ref<HTMLElement>()
function addMarker(map: Map) {
  new tt.Marker().setLngLat(initialLocation).addTo(map)

  new tt.Popup()
    .setLngLat(new LngLat(...initialLocation))
    .setHTML(vNode.value?.outerHTML ?? '')
    .addTo(map)
}

function alert() {
  window.alert('wow')
}
</script>
