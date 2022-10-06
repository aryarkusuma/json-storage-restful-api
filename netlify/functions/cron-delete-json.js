const fetch = require("node-fetch");
const Redis = require("ioredis");

export async function handler(event, context) {
  try {
    console.log("The functions started")
    await redisWrite();
    return {
      statusCode: 200,
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

async function redisWrite(){
  const Redis = require("ioredis");
  const redis = new Redis("redis://:a53fcc18c2684f1e90aa8b3fee09749e@us1-suitable-terrier-38057.upstash.io:38057");
  async function main() {
    await redis.call("FLUSHDB");
    redis.disconnect()
  }
  await main();
}
