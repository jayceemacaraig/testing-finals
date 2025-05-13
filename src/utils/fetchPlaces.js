import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
  apiKey: "AIzaSyBzHsEqRMk7xay_7xZDFxpKobFQb2JRCdU",
});

const fetchPlaces = async (place) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Generate me a JSON array containing the best places to visit only in ${place}, Lucena City, Quezon Province, Philippines. Each element in the array should be a JSON object with two keys: "destination" (string) and "coordinates" (an array of two numbers representing longitude and latitude). Please research and identify what are considered the most interesting or notable places to visit within ${place}. Ensure the output is a valid JSON array. Use the coordinate service of OpenRouteService and make sure that the coordinates that will be provided will be the same as in OpenRouteService.`,
  });
  
  return JSON.parse(response.text.slice(8, response.text.length - 4))
};

export default fetchPlaces;
