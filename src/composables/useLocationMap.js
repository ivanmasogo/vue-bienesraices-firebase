import { ref } from 'vue'

export default function useLocationMap(){
  const zoom = ref(17)
  const center = ref([25.765933585801058, -80.19569807961832])

  function pin(e) {
    const marker = e.target.getLatLng()
    center.value=[marker.lat, marker.lng]
  }

  return {
    zoom,
    center,
    pin
  }
}