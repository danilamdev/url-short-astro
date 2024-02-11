import type { APIRoute } from "astro";
import { client as redis} from '../../lib/redis'
import type { DataToDb } from "../../types";


// SAVE DATA TO DB
export const POST: APIRoute = async ({ request }) => {
  const { longUrl, hash, title = '', email } = <DataToDb>(await request.json());

  if(!longUrl || !hash){
    return new Response(JSON.stringify({status: 'error', message: 'ha habido un error con la petición'}), 
    {status: 400})
  }

  const keys = await redis.keys(`*:${hash}`)
  const keyInDb = keys.length > 0

  if(keyInDb){
    return new Response(JSON.stringify({
      status:'error', 
      message:'Este prefijo ya esta usado. Elige otro por favor'
    }), {status: 400})
  }

  const saveToDb = {
    longUrl,
    title,
    hash
  }

  await redis.set(`${email}:${hash}`, JSON.stringify(saveToDb))

  return new Response(JSON.stringify({status: "ok",longUrl, title, hash}))
}

// REMOVE KEY FROM DB
export const DELETE: APIRoute = async ({ url }) => {

  const link = new URL(url).searchParams
  const hash = link.get('hash')

  const [key] = await redis.keys(`*:${hash}`)
  await redis.del(key)
  return new Response('ok')
}