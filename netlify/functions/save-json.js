const randomstring = require("randomstring");
const fetch = require('node-fetch');
const Redis = require("ioredis");

export async function handler(event, context) {
  try {
    return await jsonSaver(event);
  }
  catch (error) {

    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to proceed' }),
    };
  }
};

async function jsonSaver(event) {

  const Redis = require("ioredis");
  const redis = new Redis("redis://:a53fcc18c2684f1e90aa8b3fee09749e@us1-suitable-terrier-38057.upstash.io:38057");
  const randString = randomstring.generate(5);
  console.log(event)
  const query = await event.queryStringParameters;
  const data = await event.body;
  console.log(event.body)
  console.log(data.length < 2);
  console.log(data.length > 20000);
  console.log(data.length < 2 || data.length > 20000);
  const dataJson = await JSON.parse(data)
  console.log(dataJson)

  if((data.length > 20000 || data.length < 2)){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Limit exceeded' }),
    };
  }

  await redis.call("SET", randString,  data );
  redis.disconnect()
  const retJsonId = "Your Json Id : " + randString + " , use it to retrive your saved json \n\n" +  "https://json.projectxi.my.id/api/get-json?id=" + randString;
  console.log(retJsonId);
  return {
    statusCode: 200, 
    headers : {
      "Content-type" : "application/json",
    },
    body: JSON.stringify({message: retJsonId}), //return key id
  }
}
