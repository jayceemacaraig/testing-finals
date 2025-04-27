import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
  apiKey: "AIzaSyBzHsEqRMk7xay_7xZDFxpKobFQb2JRCdU",
});


const fetchPlaces = async (num,place) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    // contents: `Generate me a JSON array containing the 4 best places to visit only in Dalahican, Lucena City, Quezon Province, Philippines. Each element in the array should be a JSON object with two keys: "destination" (string) and "coordinates" (an array of two numbers representing longitude and latitude).`,



    contents: `Generate me a JSON array containing the ${num} best places to visit only in ${place}, Lucena City, Quezon Province, Philippines. Each element in the array should be a JSON object with two keys: "destination" (string) and "coordinates" (an array of two numbers representing latitude and longitude). Please research and identify what are considered the most interesting or notable places to visit within Dalahican. Ensure the output is a valid JSON array.`
  });

  const places = JSON.parse(response.text.slice(8,response.text.length-3))
  console.log(places)

};

export default fetchPlaces;
