const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const userDataFilePath = path.join(__dirname, 'users.json');

module.exports = {
  config: {
    name: "tof",
    aliases: ['trueorfalse','TOF'],
    version: "1.0",
    author: "Kshitiz",
    role: 0,
    shortDescription: "Play true or false quiz",
    longDescription: "Play a true or false quiz game",
    category: "fun",
    guide: {
      en: "{p}tof"
    }
  },

  onStart: async function ({ event, message, usersData, api }) {
    const quizData = await fetchQuiz();
    if (!quizData) {
      return message.reply("Failed to fetch quiz question. Please try again later.");
    }

    const { question, correct_answer, incorrect_answers } = quizData;
    const correctAnswerLetter = correct_answer.split(',')[0].trim().toUpperCase();
    const incorrectAnswerLetter = incorrect_answers.split('[')[0].trim().toUpperCase();

    let optionsString = '';
    if (correctAnswerLetter === 'A') {
      optionsString += `A. True\nB. False`;
    } else {
      optionsString += `A. False\nB. True`;
      
