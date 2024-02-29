import express from 'express';
import { upload } from '../middleware/fileUpload.js';
import { aunthicateJWT } from '../middleware/jwtVerification.js';
import { adminViewsEqupOrderController, adminGetOtpController,adminCheckOtpController,adminChangePasswordController,verifyAdminStatusColdController, adminColdStLandController, verifyAdminStatusAgController, adminViewsAgriLandController, verifyStatusAdminController, adminVeiwEquipmentController, verifyAdminStatusController, adminViewsGrainController, statusExpertController, statusVerifyExpertController, adminGetExpertListController, statusUserController, statusVerifyupdateController, statusVerifyController, statusUpdateController, adminLoginController, adminGetUserListController, adminGetOrganizationListController,adminViewsGrainOrderController } from "../controller/adminController.js"
const adminRouter = express.Router();
adminRouter.post("/adminLogin", adminLoginController)
adminRouter.post("/statusUpdate", statusUpdateController)
adminRouter.post("/statusUser", statusUserController)
adminRouter.post("/statusExpert", statusExpertController)
adminRouter.post("/statusVerify", statusVerifyController)
adminRouter.post("/statusVerifyupdate", statusVerifyupdateController)
adminRouter.post("/statusVerifyExpert", statusVerifyExpertController)
adminRouter.post("/verifyAdminStatus", verifyAdminStatusController)
adminRouter.post("/verifyStatusAdmin", verifyStatusAdminController)
adminRouter.post("/verifyAdminStatusAg", verifyAdminStatusAgController)
adminRouter.post("/verifyAdminStatusCold", verifyAdminStatusColdController)
adminRouter.get("/adminUerList", adminGetUserListController)
adminRouter.get("/adminOrganizationList", adminGetOrganizationListController)
adminRouter.get("/adminExpertList", adminGetExpertListController)
adminRouter.get("/adminViewsGrain", adminViewsGrainController)
adminRouter.get("/adminVeiwEquipment", adminVeiwEquipmentController)
adminRouter.get("/adminViewsAgriLand", adminViewsAgriLandController)
adminRouter.get("/adminColdStLand", adminColdStLandController)

adminRouter.post('/getotp',adminGetOtpController);
adminRouter.post('/checkotp',adminCheckOtpController);
adminRouter.post('/changepassword',adminChangePasswordController);
adminRouter.get("/adminViewsGrainOrder",adminViewsGrainOrderController)
adminRouter.get("/adminViewsEqupOrder",adminViewsEqupOrderController)


export default adminRouter;
