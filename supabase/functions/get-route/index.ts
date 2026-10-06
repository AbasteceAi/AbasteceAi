import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  const { origin, destination } = await req.json()

  const url = new URL('https://maps.googleapis.com/maps/api/directions/json')
  url.searchParams.set('origin', origin)
  url.searchParams.set('destination', destination)
  url.searchParams.set('key', Deno.env.get('GOOGLE_MAPS_SERVER_KEY'))

  const res = await fetch(url)
  const data = await res.json()

  if (data.status !== 'OK') {
    return new Response(JSON.stringify({ error: data.status }), { status: 400 })
  }

  const polyline = data.routes[0].overview_polyline.points

  return new Response(JSON.stringify({ polyline }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
