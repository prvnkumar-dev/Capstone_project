const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
module.exports.getgemini=async (request,response)=>{
  let {question}=request.body

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyDCXw9sM6g9Rz5CynEqXWV3PciSPu8Xsyw";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "how to loss weight"}],
      },
      {
        role: "model",
        parts: [{ text: "## Losing Weight Safely and Effectively: \n\nThere's no one-size-fits-all approach to weight loss, but some key principles can guide you on your journey:\n\n**1. Calorie Deficit:**\n\n*   **Understand the concept:** Weight loss fundamentally boils down to consuming fewer calories than you burn.\n*   **Track your intake:** Use apps like MyFitnessPal or a food journal to monitor your calorie consumption. \n*   **Make gradual changes:** Start by reducing your daily intake by 250-500 calories for sustainable weight loss.\n\n**2. Diet Modifications:**\n\n*   **Prioritize whole foods:** Focus on fruits, vegetables, lean proteins, and whole grains.\n*   **Limit processed foods:** Reduce your intake of sugary drinks, refined carbohydrates, and unhealthy fats.\n*   **Practice mindful eating:** Pay attention to your hunger cues and avoid emotional eating.\n*   **Consider popular approaches:** Explore diets like the Mediterranean diet or DASH diet for healthy eating patterns.\n\n**3. Exercise Regularly:**\n\n*   **Find activities you enjoy:** This could be anything from brisk walking and swimming to dancing and cycling.\n*   **Incorporate strength training:** Building muscle mass helps burn more calories at rest.\n*   **Start slowly and gradually increase intensity and duration.**\n*   **Aim for at least 150 minutes of moderate-intensity exercise per week.**\n\n**4. Lifestyle Changes:**\n\n*   **Get enough sleep:** Poor sleep can disrupt hormones and increase cravings.\n*   **Manage stress:** Stress can lead to unhealthy eating habits. Explore relaxation techniques like yoga or meditation.\n*   **Stay hydrated:** Drinking plenty of water can help you feel full and reduce calorie intake.\n*   **Seek support:** Talk to friends, family, or join a support group for encouragement and accountability. \n\n**Additional Tips:**\n\n*   **Consult a healthcare professional or registered dietitian for personalized guidance.**\n*   **Set realistic goals and celebrate your progress.**\n*   **Focus on long-term health and sustainable habits, not quick fixes.**\n*   **Be patient and kind to yourself throughout the journey.**\n\n**Remember, losing weight is a marathon, not a sprint. By making healthy changes to your diet and lifestyle, you can achieve your weight loss goals and improve your overall well-being.**"}],
      },
    ],
  });

  const result = await chat.sendMessage(`${question}`);
  const res = result.response;
  const text=res.text()
  const TextResult=text.replaceAll("*","")
  const ProperFormat=TextResult.split("\n").join("<br>")
  response.send({
    answer:ProperFormat
  })
}
