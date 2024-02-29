import express from 'express';
import { indexgetColdStLandrequestController, indexgetAgriLandrequestController, indexOrgChangePasswordController, indexOrganizationRegistrantionController,indexGetOtpController,indexUserRegistrationController,indexOrganizationLoginController, indexUserLoginController, indexCheckOtpController,indexChangePasswordController } from '../controller/indexController.js';
import { upload } from '../middleware/fileUpload.js';
import { aunthicateJWT,authorizeUser } from '../middleware/jwtVerification.js';

var indexRouter = express.Router();

indexRouter.post('/',aunthicateJWT,authorizeUser);
indexRouter.post('/getotp',indexGetOtpController);
indexRouter.post('/userregistration',indexUserRegistrationController);
indexRouter.post('/userlogin',indexUserLoginController);
indexRouter.post('/organizationregistration',upload.single('org_image'),indexOrganizationRegistrantionController);
indexRouter.post('/organizationlogin',indexOrganizationLoginController);
indexRouter.post('/checkotp',indexCheckOtpController);
indexRouter.post('/changepassword',indexChangePasswordController);
indexRouter.post('/orgchangepassword',indexOrgChangePasswordController);
indexRouter.get("/getAgriLandrequest/:email",indexgetAgriLandrequestController)
indexRouter.get("/getColdStLandrequest/:email",indexgetColdStLandrequestController)

export default indexRouter;