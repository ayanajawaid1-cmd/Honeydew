require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Test command
app.command("/honeydew-ping", async ({ command, ack, respond }) => {
  await ack();

  await respond({
    response_type: "in_channel",
    text: "🍯 Pong! Honeydew is alive!",
  });
});

app.command("/honeydew-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");

    await respond({
      text: `🐱 Cat Fact:\n${response.data.fact}`
    });

  } catch (err) {
    await respond({
      text: "❌ Failed to fetch a cat fact."
    });
  }
});

(async () => {
  await app.start();

  console.log("⚡️ Honeydew is running!");
})();