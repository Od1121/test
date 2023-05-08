import { Method } from "@goodtechsoft/xs-micro-service";
import { Request, Response } from "../../../middlewares/sign";
import { User } from "../../../models/User";
import { startTransaction } from "../../../core/sequelize";



type IBody = {
    is_active : string;
  
  }
export default Method.post(`/user/update`, null, async (req: Request, res: Response) => {

    //end code oo bichne 
  
    //const existUser = await User.findAll({}); 
        res.json({
          test: "update"
        });
    });
    
