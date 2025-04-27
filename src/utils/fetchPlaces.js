// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: "AIzaSyBzHsEqRMk7xay_7xZDFxpKobFQb2JRCdU",
// });

// const fetchPlaces = async (num, place) => {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: `Generate me a JSON array containing the ${num} best places to visit only in ${place}, Lucena City, Quezon Province, Philippines. Each element in the array should be a JSON object with two keys: "destination" (string) and "coordinates" (an array of two numbers representing longitude and latitude). Please research and identify what are considered the most interesting or notable places to visit within Dalahican. Ensure the output is a valid JSON array.`,
//   });

//   const places = JSON.parse(response.text.slice(8, response.text.length - 3));
//   return places
// };

// export default fetchPlaces;




// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-e827356dc48c40dd980cdb69aa024d99'
});

async function fetchPlaces() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Generate me a JSON array containing the ${num} best places to visit only in ${place}, Lucena City, Quezon Province, Philippines. Each element in the array should be a JSON object with two keys: "destination" (string) and "coordinates" (an array of two numbers representing longitude and latitude). Please research and identify what are considered the most interesting or notable places to visit within Dalahican. Ensure the output is a valid JSON array.` }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

export default fetchPlaces;