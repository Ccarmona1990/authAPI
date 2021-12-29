export const getGreeting = (req, res)=>{
    res.status(200).json({success: true, msg: `Authentication API`})
}