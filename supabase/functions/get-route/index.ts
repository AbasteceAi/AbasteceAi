import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
Deno.serve(async (req) => {
    if(req.method === 'OPTIONS'){
      return new Response('Ok', {headers:corsHeaders})
    }

try{
  const { origin, destination } = await req.json()
 const apiKey = Deno.env.get('ORS_API_KEY')
    if (!apiKey) {
      throw new Error('ORS_API_KEY não configurada')
    }

  const url = new URL('https://api.heigit.org/openrouteservice/v2/directions/driving-car')
  url.searchParams.set('api_key', Deno.env.get('ORS_API_KEY'))
  url.searchParams.set('start', origin)
  url.searchParams.set('end', destination)

  const res = await fetch(url)
  const data = await res.json()

  if (!data.features || !data.features[0]) {
    return new Response(JSON.stringify({ error: 'Rota não encontrada' }), { status: 400 },{
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }



  const coords = data.features[0].geometry.coordinates

   return new Response(JSON.stringify({ coords }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

}
 catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
