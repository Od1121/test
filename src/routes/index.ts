import { Routes } from "@goodtechsoft/xs-micro-service";
import { Router } from "express";
import { SESSION_SCOPE } from "../constants/SESSION_SCOPE";
import { auth } from "../middlewares/auth";
import { sign } from "../middlewares/sign";

export const routes = () => {
  const router = Router();

  router.use("/2fa/auth", [sign(SESSION_SCOPE.NONE), Routes(__dirname, [
    "/api/auth/verify",

    "/api/auth/login",
    "/api/auth/refresh-token"
  ])]);

  router.use("/2fa/auth", [sign(SESSION_SCOPE.FORGOT), auth, Routes(__dirname, [
    "/api/otp/get",
    "/api/otp/verify"
  ])]);

  router.use("/2fa/auth", [sign(SESSION_SCOPE.CHANGE_PASSWORD), auth, Routes(__dirname, [
    "/api/password/change"
  ])]);

  router.use("/2fa/auth", [sign(SESSION_SCOPE.AUTHORIZED), auth, Routes(__dirname, "/api")]);

  return router;
};