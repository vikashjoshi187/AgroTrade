import express from 'express';
import { upload } from '../middleware/fileUpload.js';
import { aunthicateJWT } from '../middleware/jwtVerification.js';
import { getPartiesDataColdControlller, removeAgreementColdstController, creteAgreementColdController,getColdStContractsControlller, requestForLandColdStController,orgVeiwAgriLandController,orgVeiwColdLandController,requestForLandController,orgVeiwProfileController,orgUpdateProfileController,getContractsControlller,creteAgreementController,removeAgreementController,getPartiesDataControlller,payColdStorageAmountController,payAgriStorageAmountController} from '../controller/organizationController.js'
const orgRouter = express.Router();
orgRouter.get("/orgVeiwAgriLand",orgVeiwAgriLandController)
orgRouter.get("/orgVeiwColdLand",orgVeiwColdLandController)
orgRouter.post("/requestForLand",requestForLandController)
orgRouter.post("/requestForLandColdSt",requestForLandColdStController)
orgRouter.post("/getOrgProfile",orgVeiwProfileController)
orgRouter.post("/updateorgprofile",upload.single('org_image'),orgUpdateProfileController)
orgRouter.get("/getContracts/:dealer_email",getContractsControlller)
orgRouter.get("/getColdStContracts/:dealer_email",getColdStContractsControlller)
orgRouter.get("/getPartiesData/:dealer_email",getPartiesDataControlller)
orgRouter.get("/getPartiesDataCold/:dealer_email",getPartiesDataColdControlller)
orgRouter.post("/creteAgreement",creteAgreementController);
orgRouter.post("/creteAgreementCold",creteAgreementColdController);
orgRouter.post("/removeAgreement",removeAgreementController);
orgRouter.post("/removeAgreementColdst",removeAgreementColdstController);
orgRouter.post("/payColdStorageAmount",payColdStorageAmountController);
orgRouter.post("/payAgriStorageAmount",payAgriStorageAmountController);

export default orgRouter;