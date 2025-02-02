import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';
import User from '../configs/models/user.model';

const router = Router();

router.post("/login", 
  async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email:email}});
  
     if(user && (await bcrypt.compare(password,user.password))) {
      res.send(generateTokenReponse(user));
     }
     else{
       res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
     }
  
  }
)
  
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({where:{email:email}});
    if(user){
      res.status(HTTP_BAD_REQUEST)
      .send('User is already exist, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const dbUser = await User.create({
      name: name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      isAdmin: false});
    return res.status(200).json(generateTokenReponse(dbUser));
  }
)

  const generateTokenReponse = (user : any) => {
    const token = jwt.sign({
      id: user.id, email:user.email, isAdmin: user.isAdmin
    },'9ba3a3324f452f03d44d01c2bd28ad0fcfe07220965a76ce65866b964d7d91933a2f5d87187bcf5d3b8b0cc0a4a7f9ac79850f0b0511ff35aff9be9d384ea0828bb2d32ea18639d196048db6e4f59983bca314b790bea735dd0eb8324b3bb69dfc48c601696afe253ab2ed140494514871bb5c6d7ace857bde5e9c448903391adf0510ac6acbffd331fe88010645117716dc3eefbd4862a90f0d5a79e62d35cf2216097f979a0d394b6e3378f7199ac6eb28f960e0213bd74ef3b273c9272168be3d752a04587367bcb971ad6794ec4b5c354f82b55fb68dca78df48c5c90a22a54953bc3ccbeb42bd36348311d7afa9e419a4c5ed47bbc01c27bcfa8cf50d4f',{
      expiresIn:"30d"
    });
  
    return {
      id: user.id,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token 
    };
  }
  
router.get("/getAll", async (req, res) => {
    try{
      const users = await User.findAll({
        attributes: ['id','name','email','isAdmin']
      });
      if(users.length ==0 ){
        return res.status(200).json({error: 'users not found'})
      }
      return res.status(200).json(users)

    }catch(error){
      console.log(error)
      return res.status(500).json({error: 'Internal server error'})
    }
  
  }
)

export default router;
