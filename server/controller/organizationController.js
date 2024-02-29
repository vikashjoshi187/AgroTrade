import { users, grains, equipments, coldStLands, agriLand, cart, expertBook } from "../models/userModel.js";
import organisations, { contractLandModel, contractLandColdModel } from "../models/organizationModel.js";
import mongoose from "mongoose";
import { request, response } from "express";

export const orgVeiwAgriLandController = async (request, response) => {
    try {
        var orgAgriList = await agriLand.find({ $and: [{ admin_verify: true }, { avilable: true }] });
        response.status(200).json({ result: orgAgriList })
    } catch (error) {
        console.error('Error in orgVeiwAgriLandController', err);
        response.status(203).json({ message: "Error in Org view agri Controller" });
    }
}

export const orgVeiwColdLandController = async (request, response) => {
    try {
        var orgColdList = await coldStLands.find({ $and: [{ admin_verify: true }, { avilable: true }] });
        response.status(200).json({ result: orgColdList })
    } catch (error) {
        console.error('Eroor iin orgVeiwColdLandController', err);
        response.status(203).json({ message: "Error in Org view Cold Controller" });
    }
}

export const requestForLandController = async (request, response) => {
    try {
        var orgObj = await organisations.findOne({ dealer_email: request.body.dealer_email });
        var obj = {
            factoryOwnerId: orgObj._id,
            landId: request.body.LandId,
            grainName: request.body.grainName,
            quantity: request.body.quantity,
            timeDuration: request.body.timeDuration
        }
        var result = await contractLandModel.create(obj);
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in requestForLandController", err);
    }
}

export const requestForLandColdStController = async (request, response) => {
    try {
        var orgObj = await organisations.findOne({ dealer_email: request.body.dealer_email });
        var obj = {
            tenatId: orgObj._id,
            landId: request.body.LandId,
            timeDuration: request.body.timeDuration,
            itemType: request.body.itemType
        }
        var result = await contractLandColdModel.create(obj);
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in requestForLandColdStController", err);
        response.status(500).json({ message: "Inter nal server error!!" })
    }
}

export const orgVeiwProfileController = async (request, response) => {
    try {
        var orgProfile = await organisations.findOne({ dealer_email: request.body.dealer_email })
        response.status(200).json({ result: orgProfile })
    } catch (error) {
        console.error('Eroor in orgVeiwProfileController', error);
        response.status(203).json({ message: "Error in Org view profile Controller" });
    }
}

export const orgUpdateProfileController = async (request, response) => {
    try {
        const { dealer_email } = request.body;
        try {
            var image = ''
            if (request.file.filename != "undefine") {
                image = request.file.filename;
                request.body = { ...request.body, ["org_image"]: image };
            }
        } catch (err) {
            console.error('Error in norgUpdateProfileController',err);
        }
        const result = await organisations.updateOne({ dealer_email: dealer_email }, { $set: request.body });
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error('Error in norgUpdateProfileController',err);
    }

}

export const getContractsControlller = async (request, response) => {
    try {
        const orgObj = await organisations.findOne({
            dealer_email: request.params.dealer_email,
        });
        const _id = orgObj._id;
        const result = await contractLandModel.find({ factoryOwnerId: _id });
        const contractsDetaials = await contractLandModel.aggregate([
            {
                $match: { factoryOwnerId: _id }
            },
            {
                $lookup: {
                    from: "agriLand",
                    localField: "landId",
                    foreignField: "_id",
                    as: "landDetails",
                },
            },
            {
                $unwind: "$landDetails",
            },
            {
                $project: {
                    landDetails: {
                        _id: "$landDetails._id",
                        landTitle: "$landDetails.landTitle",
                        area: "$landDetails.area",
                        rent: "$landDetails.rent",
                        address: "$landDetails.address",
                        city: "$landDetails.city",
                        state: "$landDetails.state",
                        zipCode: "$landDetails.zipCode",
                        image: "$landDetails.image",
                        image360: "$landDetails.image360",
                    },
                    contractDetails: {
                        _id: "$_id",
                        factoryOwnerId: "$factoryOwnerId",
                        grainName: "$grainName",
                        quantity: "$quantity",
                        timeDuration: "$timeDuration",
                        userStatus: "$userStatus",
                        price: "$price",
                        description: "$description",
                        createdAt:"$createdAt",
                        updatedAt:"$updatedAt",
                        orgSign:"$orgSign",
                        farmerSign:"$farmerSign",

                    }
                },
            },

        ]);
        response.status(200).json(contractsDetaials);
    } catch (error) {
        console.error("Error in getContractsControlller", error);
        response.status(500).json({ message: "Internam servwr Error!!" });
    }
};

export const getColdStContractsControlller = async (request, response) => {
    try {
      const orgObj = await organisations.findOne({
        dealer_email: request.params.dealer_email,
      });
      const _id = orgObj._id;
      const result = await contractLandColdModel.find({ tenatId: _id });
  
      const contractsDetaials = await contractLandColdModel.aggregate([
          {
              $match: { tenatId: _id }
          },
          {
              $lookup: {
                  from: "coldStLands",
                  localField: "landId",
                  foreignField: "_id",
                  as: "landDetails",
              },
          },
          {
              $unwind: "$landDetails",
          },
          {
              $project: {
                  landDetails: {
                      _id: "$landDetails._id",
                      landTitle: "$landDetails.landTitle",
                      area: "$landDetails.area",
                      rent: "$landDetails.rent",
                      address: "$landDetails.address",
                      city: "$landDetails.city",
                      state: "$landDetails.state",
                      pincode: "$landDetails.pincode",
                      image: "$landDetails.image",
                      image360: "$landDetails.image360",
                  }, 
                  contractDetails: {
                      _id: "$_id",
                      landId:"$landId",
                      tenatId:"$tenatId",
                      timeDuration:"$timeDuration",
                      userStatus:"$userStatus",
                      price:"$price",
                      description:"$description",
                      createdAt:"$createdAt",
                      updatedAt:"$updatedAt",
                      orgSign:"$orgSign",
                      farmerSign:"$farmerSign",  
                  }
              },
          },
         
      ]);
      response.status(200).json(contractsDetaials);
    } catch (error) {
      console.error("Error in getColdStContractsControlller", error);
      response.status(500).json({ message: "Internam servwr Error!!" });
    }
};

export const creteAgreementController = async (request, response) => {
    try {
        const result = await contractLandModel.updateOne({ _id: request.body._id }, { $set: { orgSign: request.body.orgSign, totalPrice: request.body.totalPrice, agreementDate: request.body.agreementDate } });
        response.status(201).json({message:"success"});
    } catch (error) {
        console.error("Error in creteAgreementController", error);
        response.status(500).json({ error })
    }

}

export const creteAgreementColdController = async (request, response) => {
    try {
        const result = await contractLandColdModel.updateOne({ _id: request.body._id }, { $set: { orgSign: request.body.orgSign,agreementDate: request.body.agreementDate } });
        response.status(200).json({message:"success"});
    } catch (error) {
        console.error("Error in creteAgreementColdController", error);
        response.status(500).json({ error })
    }

}

export const removeAgreementController = async (request, response) => {
    try {
        const result = await contractLandModel.deleteOne({ _id: request.body._id });
        response.status(200).json({});
    } catch (error) {
        console.error("Error in removeAgreementController", error);
        response.status(500).json({ error })
    }
}

export const removeAgreementColdstController = async (request, response) => {
    try {
        const result = await contractLandColdModel.deleteOne({ _id: request.body._id });
        response.status(200).json({});

    } catch (error) {
        console.error("Error in removeAgreementColdstController", error);
        response.status(500).json({ error })
    }
}

export const getPartiesDataControlller = async (request, response) => {
    try {
        const result = await organisations.findOne({ dealer_email: request.params.dealer_email });
        var org_id = result._id;
        const contracts = await contractLandModel.find({ factoryOwnerId: { $in: org_id } });
        const landIds = contracts.map(contract => contract.landId);
        const agriLands = await agriLand.find({ _id: { $in: landIds } }).populate('_id');
        const ownerEmails = agriLands.map(contract => contract.ownerEmail);
        const results = await users.find({email:{$in:ownerEmails}})
        const agriLandMap = new Map(agriLands.map(agriLands => [agriLands._id.toString(), agriLands]));
        const mergedData = contracts.map(contract => {
            const agril = agriLandMap.get(contract.landId.toString());
            return { ...contract,agril,result };
          });
          const mergedResults = mergedData.map(item => {
            const resultss = results.find(r => r.email === item.agril.ownerEmail);
            return { ...item, resultss };
        });
        // console.log("mergedResults",mergedResults);
        response.status(200).json(mergedResults);

    } catch (error) {
        console.error("Error in getPartiesDataControlller", error);
        response.status(500).json({ error })
    }
}
export const getPartiesDataColdControlller = async (request, response) => {
    try {
        const result = await organisations.findOne({ dealer_email: request.params.dealer_email });
        var org_id = result._id;
        const contracts = await contractLandColdModel.find({ tenatId: { $in: org_id } });
        const landIds = contracts.map(contract => contract.landId);
        const coldLands = await coldStLands.find({ _id: { $in: landIds } }).populate('_id');
        // console.log("coldLands",coldLands);
        const ownerEmails = coldLands.map(contract => contract.userEmail);
        const results = await users.find({email:{$in:ownerEmails}})
        const agriLandMap = new Map(coldLands.map(coldLands => [coldLands._id.toString(), coldLands]));
        const mergedData = contracts.map(contract => {
            const cold = agriLandMap.get(contract.landId.toString());
            return { ...contract,cold,result };
          });
        const mergedResults = mergedData.map(item => {
            const resultss = results.find(r => r.email === item.cold.userEmail);
            return { ...item, resultss };
        });
        // console.log("mergedResults",mergedResults);
        response.status(200).json(mergedResults);

    } catch (error) {
        console.error("Error in getPartiesDataColdControlller", error);
        response.status(500).json({ error })
    }
}


export const payColdStorageAmountController = async (request, response) => {
    try {
        console.log("this is request body",request.body);
        const result = await contractLandColdModel.updateOne({ _id: request.body._id },{$set:{paymentStatus:true}});
        response.status(200).json({message:"Paid"});

    } catch (error) {
        console.error("Error in payColdStorageAmountController", error);
        response.status(500).json({message:"Paid", error })
    }
}

export const payAgriStorageAmountController = async (request, response) => {
    try {
        console.log("this is request body",request.body);
        const result = await contractLandModel.updateOne({ _id: request.body._id },{$set:{paymentStatus:true}});
        response.status(200).json({message:"Paid"});

    } catch (error) {
        console.error("Error in payAgriStorageAmountController", error);
        response.status(500).json({message:"Paid", error })
    }
}

