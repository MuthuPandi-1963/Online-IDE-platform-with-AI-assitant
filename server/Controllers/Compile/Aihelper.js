import {AI21} from 'ai21'

const AIHelper = async (req, res) => {
  try {
    const {content} = req.body;
    if(!content){
        return res.status(500)
        .json({
            data :"No Prompt Found",
            error:true,
            success:false
        })
    }
    // console.log(process.env.AI21_API_KEY);
    
    const client = new AI21({
        apiKey: process.env.AI21_API_KEY, // or pass it in directly
      });
    const response = await client.chat.completions.create({
      model: "jamba-large",
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });
    console.log(  );
    res.status(200)
    .json({
        data : response.choices[0],
        message : "data fetched sucessfully",
        sucess:true
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: {},
    });
  }
};
export default AIHelper;