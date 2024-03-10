const profileModel= require("../model/ProfileModel")
const jwt = require("jsonwebtoken")

exports.createProfile = async (req, res) => {
    try {
        const profile = await profileModel.create(req.body); // Use req.body instead of req.reqBody
        res.status(200).json({ status: "success", data: profile });
    } catch (error) {
        res.status(400).json({ status: "failed", data: error });
    }
};


exports.userLogin = async (req, res) => {
   
  try {
    
    const{Username,Password}= req.body
    if (!Username || !Password) {
      return res.status(400).json({ status: 'failed', message: 'Username and password are required' });
  }

   
    
    let data = await profileModel.findOne({'Username':Username,'Password':Password})

    if (!data) {
      
      return res.status(401).json({ status: 'failed', message: 'Invalid username or password' });
  }
//auth token
  let payload={exp: Math.floor(Date.now() / 1000) + (24*60 * 60),
  data:data

} 
let token = jwt.sign(payload,"sect123")

  res.status(200).json({ status: 'success', message: 'Login successful',token:token, data: data });
    
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
    
   
}

exports.readProfile = async (req, res) => {
    let Username = req.headers['Username'];
    
    try {
        let data = await profileModel.findOne({ 'Username': Username });
        if (!data) {
            return res.status(401).json({ status: 'failed', message: 'Invalid username or password' });
        } else {
            res.status(200).json({ status: 'success', message: 'Login successful', data: data });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}


exports.updateProfile = async (req, res) => {
  let Username = req.headers['Username'];
  const reqBody = req.body;
  
  

  try {
    const update = { $set: reqBody }
    let data = await profileModel.updateOne({ 'Username': Username },update,{w:1} );
    if (!data) {
        return res.status(401).json({ status: 'failed', message: 'Invalid username or password' });
    } else {
        res.status(200).json({ status: 'success', message: 'Login successful', data: data });
    }
} catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
}
  

}

    




