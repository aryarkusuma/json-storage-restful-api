const Redis = require("ioredis");
export async function handler(event, context) {
  try {
    console.log("The functions started")
    let data = await readData(event)
    if(data == null){
      data = JSON.stringify({massage: 'Data Not Found'});
    }
    return {
      statusCode: 200,
      headers : {
        "Content-type" : "application/json",
      },
      body: data
    }
  }

  catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to proceed' }),
    };
  }
};

async function readData(event){
  const query = await event.queryStringParameters;
  if(typeof(query.id) == 'undefined' || query.id.length < 5 || query.id.length > 5){
    return null
  }
  const id = query.id
  const redis = new Redis("redis://:a53fcc18c2684f1e90aa8b3fee09749e@us1-suitable-terrier-38057.upstash.io:38057");
  const json = await redis.call("GET", id);
  console.log(json);
  redis.disconnect()
  return json;
}
