const router = require("express").Router();
const axios = require("axios");

const makeRequest = async (prompt) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );
  return response.data.choices[0];
};

router.post("/send-prompt", async (req, res) => { 
  try {
    let completeResponse = ""
    let finishedReason = ""
    let prompt = req.body.prompt
    let maxLimit = 5
    do {
      const response = await makeRequest(prompt);
      finishedReason = response.finish_reason

      completeResponse += response.message.content
      prompt = `please complete this response: ${completeResponse}`
      console.log(finishedReason) 
      console.log(response) 

      if(maxLimit == 0 || finishedReason == 'stop') {
        break;           
      }
      maxLimit -= 1
     
    } while(maxLimit > 0);

    // console.log(completeResponse)
    res.send(completeResponse);
  } catch (err) { 
    res.send({ err: err.message });
  }
});

module.exports = router;