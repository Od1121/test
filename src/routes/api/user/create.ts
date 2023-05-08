
import { Method, NotfoundError, ValidationError } from "@goodtechsoft/xs-micro-service";
import Joi from "joi";
import { ERRORS, USER_STATUS } from "../../../constants";
import { startTransaction } from "../../../core/sequelize";
import { Request, Response } from "../../../middlewares/sign";

import { User } from "../../../models/User";

const schema = Joi.object({
  firstName       : Joi.string().max(100).required(),
  lastName        : Joi.string().max(100).required(),
  registerNo      : Joi.string().max(45).required(),
  phone           : Joi.string().max(45).required(),
  email           : Joi.string().max(255).required(),
  password        : Joi.string().max(255).required(),
});

type IBody = {
  firstName : string;
  lastName : string;
  registerNo : string;
  phone : string;
  email : string;
  password: string;
  id: string;
}
console.log("********1******")
export default Method.post("/user/create", schema, async (req: Request, res: Response) => {
  const {
    id,
    firstName,
    lastName,
    registerNo,
    phone,
    email,
    password,
  }: IBody = req.body;
  
console.log("********2******")
  console.log(req.body);
  return startTransaction(async (commit, rollback, transaction) => {
    try {
      
      const existUser = await User.findOne({ where: { email: email.toLowerCase() }, transaction });
      console.log(existUser)
      // if (existUser) throw new ValidationError(ERRORS.USER_ALREADY_REGISTERED, "Хэрэглэгч бүртгэгдсэн байна.");
      
      let user = new User({
        registerNo  : registerNo,
        id   : id ,
        lastName    : lastName.trim(),
        firstName   : firstName.trim(),
        phone : phone,
        email       : email.toLowerCase(),
        password :password
      });
      await user.save({ transaction });
      
      await commit();

      res.json({ success: true });
    } catch (err) {
      await rollback();

      throw err;
    }
  });
});