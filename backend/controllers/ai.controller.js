const aiService = require("../services/ai.services")

const aiController = async (req, res)=>{
    const code = req.body.code
    if(!code){
        return res.send("Prompt is Required")
    }

    const response = await aiService(code)

    res.send(response)
}

module.exports = {aiController}