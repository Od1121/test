import { Method, NotfoundError } from "@goodtechsoft/xs-micro-service";
import { Request, Response } from "../../../middlewares/sign";
import { User } from "../../../models/User";
//import { startTransaction } from "../../../core/sequelize";
import { ERRORS } from "../../../constants";



type IBody = {
    is_active : string;
  
  }
export default Method.post(`/user/get`, async (req: Request, res: Response) => {

  // const id = req.user.id;
  
  //   const user = User.findOne({
  //     where: {
  //       id: id,
  //       //userId: req.user.userId
  //     }
  //   });
  //   if (!user) throw new NotfoundError(ERRORS.USER_NOTFOUND, "Хэрэглэгч олдсонгүй!");
  
  //     const users = await User.findAll({
  //     where: {
  //       UserId: user.id
  //     },
  //     include: [{
  //       models     : user,
  //       as        : "users",
  //       attributes: ["id"]
  //     }]
  //   });
  //   console.log(" >>>\n  ========== Method.get ========== users", users);   

    
  //   //const existUser = await User.findAll({}); 
  //       res.json({
  //           test: "get"
  //          });
  //   });
    
