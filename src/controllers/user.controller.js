import {asyncHandler} from "../ulits/asyncHandler.js"


export const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "ok",
    })
})