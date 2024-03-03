module.exports = {
  config: {
    name: "play",
    version: "1.0",
    role: 0,
    author: "KSHITIZ",
    countDown: 60,
    shortdescription: "play song with lyrics",//use offical music name 
    longdescription: "always use official music title for lyrics",
    category: "music",
    usages: "{pn} play (song name)",
    dependencies: {
      "fs-extra": "",
      "request": "",
      "axios": "",
      "ytdl-core": "",
      "yt-search": ""
    }
  },

  onStart: async ({ api, event }) => {
    const axios = require("axios");
    const fs = require("fs-extra");
    const ytdl = require("ytdl-core");
    const request = require("request");
    const yts = require("yt-search");

    const input = event.body;
    const text = input.substring(12);
    const data = input.split(" ");

    if (data.length < 2) {
      return api.sendMessage("Please write music name", event.threadID);
    }

    data.shift();
    const song = data.join(" ");

    try {
      api.sendMessage(`🕵‍♂ | Searching Lyrics and Music for "${song}".\n⏳ | Please wait...🤍`, event.threadID);

      const res = await axios.get(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`);
      
