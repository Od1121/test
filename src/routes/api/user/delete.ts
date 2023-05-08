import { Method } from "@goodtechsoft/xs-micro-service";
import { Request, Response } from "../../../middlewares/sign";
import { User } from "../../../models/User";
import { startTransaction } from "../../../core/sequelize";



type IBody = {
    is_active : string;
  
  }
export default Method.post(`/user/delete`, null, async (req: Request, res: Response) => {
    
       

    const existUser = await User.({}); 
        res.json({
            test: 
           });
    });
    
