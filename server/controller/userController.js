import { users, grains, equipments, coldStLands, agriLand, cart,cartEqp ,expertBook, grainOrder} from "../models/userModel.js";
import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
import organisations, { contractLandModel,contractLandColdModel } from "../models/organizationModel.js";


export const newExpertController = async (req, res) => {
    const { experience, education, consultancy_field, consultancy_type, consultancy_fee_video, consultancy_fee_chat, email,grainOrder } = req.body
    const updateUser = {
        experience,
        education,
        consultancy_field,
        consultancy_type,
        certificate: req.file.filename,
        expert_status: true
    };
    // Check if consultancy_fee_video exists in req.body, then add it to updateUser
    if (consultancy_fee_video !== undefined) {
        updateUser.consultancy_fee_video = consultancy_fee_video;
    }

    // Check if consultancy_fee_chat exists in req.body, then add it to updateUser
    if (consultancy_fee_chat !== undefined) {
        updateUser.consultancy_fee_chat = consultancy_fee_chat;
    }
    try {
        const user = await users.findOneAndUpdate({ email: email }, updateUser, { new: true });
        res.status(201).json({ msg: "Expert Details updated" })
    } catch (err) {
        console.error("Error", err)
        res.status(500).json({ msg: "Error While updating User" })
    }

}

export const getUserController = async (req, res) => {
    try {
        const userData = await users.aggregate([{ $match:{ email: req.body.email }}]);
        res.status(200).json(userData);
    }
     catch (err) {
        console.error("Error in getUserController", err)
        res.status(500).json({ msg: "err while fetching user" })
    }
}


export const updateProfileController = async (req, res) => {
    req.body.image = req.file.filename;
    req.body.user_status = true;
    try {
        const resp = await users.findOneAndUpdate({ email: req.body.email }, { $set: req.body });
        const userData = await users.aggregate([{ $match: { email: req.body.email } }]);
        res.status(201).json({ result: userData });
    } catch (err) {
        console.error("Error inupdateProfileController", err);
        res.status(500).json({ msg: "error while updating" });
    }
}

export const grainInsertController = async (request, response) => {
    try {
        var grainData = {
            ...request.body,
            image: request.file.filename
        };
        var newGrain = await grains.create(grainData);
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in grainInsertController", err);
    }
}


export const coldStLandsInsertController = async (request, response) => {
    try {
        const { image, image360 } = request.files;
        var coldStLandsData = {
            ...request.body,
            image: image ? image[0].filename : null,
            image360: image360 ? image360[0].filename : null,
        };
        var newGrain = await coldStLands.create(coldStLandsData);
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in coldStLandsInsertController", err);
    }
}

export const getGrainController = async (request, response) => {
    try {
        var result = await grains.find({ userEmail: request.body.userEmail });
        response.status(201).json({ result })
    } catch (err) {
        console.error("Error in getGrainController", err);
    }
}


export const getcoldStLandsController = async (request, response) => {
    try {
        var result = await coldStLands.find({ userEmail: request.body.userEmail });
        response.status(201).json({ result })
    } catch (err) {
        console.error("Error in getcoldStLandsController", err);
    }
}

export const deleteGrainController = async (request, response) => {
    try {
        var result = await grains.deleteOne({ _id: request.body.GrainId });
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in deleteGrainController", err);
    }
}

export const deleteColdStLandController = async (request, response) => {
    try {
        var result = await coldStLands.deleteOne({ _id: request.body.coldStId });
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in deleteColdStLandController", err);
    }
}

export const updateColdStLandController = async (request, response) => {
    const { _id } = request.body;
    try {
        if (request.files && request.files.image) {
            const image = request.files.image[0].filename;
            request.body = { ...request.body, ["image"]: image };
        }

        if (request.files && request.files.image360) {
            const image360 = request.files.image360[0].filename;
            request.body = { ...request.body, ["image360"]: image360 };
        }
    } catch (err) {
        console.error("Error in updateColdStLandController ", err);
    }
    const result = await coldStLands.updateOne({ _id: _id }, { $set: request.body });
    response.status(201).json({ message: "success" })
}

export const updateAgriLandController = async (request, response) => {
    const { _id } = request.body;
    try {
        if (request.files && request.files.image) {
            const image = request.files.image[0].filename;
            request.body = { ...request.body, ["image"]: image };
        }

        if (request.files && request.files.image360) {
            const image360 = request.files.image360[0].filename;
            request.body = { ...request.body, ["image360"]: image360 };
        }
    } catch (err) {
        console.error("Error in updateAgriLandController", err);
    }
    const result = await agriLand.updateOne({ _id: _id }, { $set: request.body });
    const Lands = await agriLand.find({ ownerEmail: request.body.ownerEmail });
    response.status(201).json({ message: "success", Lands })
}

export const updateGrainController = async (request, response) => {
    const { _id } = request.body;
    try {
        var image = '';
        if (request.file.filename != "undefined") {
            image = request.file.filename;
            request.body = { ...request.body, ["image"]: image };
        }
    } catch (err) {
        console.error("Error in updateGrainController",err);
    }
    const result = await grains.updateOne({ _id: _id }, { $set: request.body });
    response.status(201).json({ message: "success" })
}

export const addEquipmentController = async (request, response) => {
    try {
        var equipmentData = {
            ...request.body,
            image: request.file.filename
        };
        var newEquipment = await equipments.create(equipmentData);
        response.status(201).json({ message: "success" });
    } catch (err) {
        console.error("Error in addEquipmentController", err);

    }
}

export const getEquipmentController = async (request, response) => {
    console.log("request.body", request.body.userEmail);
    try {
        var result = await equipments.find({ userEmail: request.body.userEmail })
        response.status(201).json({ result });
    } catch (err) {
        console.error("Error in getEquipmentController", err);
    }
}

export const deleteEquipmentController = async (request, response) => {
    console.log("request.body", request.body.EquipmentId);
    try {
        var result = await equipments.deleteOne({ _id: request.body.EquipmentId });
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in deleteEquipmentController", err);
    }
}

export const updateEquipmentController = async (request, response) => {
    const { _id } = request.body;
    try {
        var image = '';
        if (request.file.filename != "undefined") {
            image = request.file.filename;
            request.body = { ...request.body, ["image"]: image };
        }
    } catch (err) {
        console.error("Error in updateEquipmentController");
    }
    const result = await equipments.updateOne({ _id: _id }, { $set: request.body });
    response.status(201).json({ message: "success" })
}

export const addAgriLandController = async (request, response) => {
    try {
        const { image, image360 } = request.files;
        const landData = {
            ...request.body,
            image: image ? image[0].filename : null,
            image360: image360 ? image360[0].filename : null,
        };
        var suitableFor=landData.suitableFor.split(',')
        landData.suitableFor=suitableFor;
        const newAgriLand = await agriLand.create(landData);
        const Lands = await agriLand.find({ ownerEmail: request.body.ownerEmail });
        response.status(201).json({ message: "success", Lands: Lands });
    } catch (err) {
        console.error("Error in addAgriLandController", err);
        response.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAgriLandController = async (request, response) => {
    try {
        const Lands = await agriLand.find({ ownerEmail: request.query.ownerEmail });
        response.status(201).json({ message: "success", Lands });
    } catch (err) {
        console.error("Error in getAgriLandController", err);
        response.status(500).json({ message: "Internal Server Error" });
    }
}

export const removeAgriLandController = async (request, response) => {
    try {
        console.log(request.query);
        await agriLand.deleteOne({ _id: request.query._id });
        const Lands = await agriLand.find({ ownerEmail: request.query.ownerEmail });
        response.status(201).json({ message: "success", Lands });
    } catch (err) {

        console.error("Error in removeAgriLandController", err);
        response.status(500).json({ message: "Internal Server Error" });
    }
}

export const getExpertContrller = async (req, res) => {
    try {
        const expert = await users.aggregate([{ $match: { expert_status: true } }]);
        if (expert.length === 0) {
            res.status(204).json({ msg: "There is no expert available" })
        } else {
            res.status(200).json({ expert: expert });

        }
    } catch (err) {
        console.error("Error in getExpertContrller",err);
        res.status(500).json("error while fetching expert");
    }
}

export const getMarketGrainContrller = async (request, response) => {
    try {
        const grain = await grains.find({admin_verify:true});
        response.status(200).json({ grain: grain });

    } catch (err) {
        console.error("Error in getMarketGrainContrller", err);
        response.status(500).json({ msg: 'err while fetching grain for market' })

    }


}

export const getMarketEquipmentContrller = async (request, response) => {
    try {
        const equipment = await equipments.find({admin_verify:true});
        response.status(200).json({ equipment: equipment });

    } catch (err) {
        console.error("Error in getMarketEquipmentContrller", err);
        response.status(500).json({ msg: 'err while fetching equiment for market' })

    }


}

export const getMarketLandContrller = async (request, response) => {
    try {
        const agriland = await agriLand.find({admin_verify:true});
        response.status(200).json({ agriLand: agriland });

    } catch (err) {
        console.error("Error in getMarketLandContrller", err);
        response.status(500).json({ msg: 'err while fetching agriLand for market' })

    }


}

export const getMarketStorageContrller = async (request, response) => {
    try {
        const storage = await coldStLands.find({admin_verify:true});
        response.status(200).json({ storage: storage });

    } catch (err) {
        console.error("Error in getMarketStorageContrller", err);
        response.status(500).json({ msg: 'err while fetching storage for market' })

    }

}

export const addcartController = async (request, response) => {
    try {
        const { _id, email } = request.body;
        console.log("id email", _id, email);

        const productId = new ObjectId(_id);

        const product = await grains.findOne({ _id: productId });

        const userIdObj = await users.aggregate([
            { $match: { email: email } },
            { $project: { _id: 1 } }
        ]);
        console.log("userId", userIdObj);
        const userId = userIdObj[0]._id;

        const existingCart = await cart.findOne({ $and:[ {userId: userId},{order_g:false}] });
        console.log("exisisting cart",existingCart);
        if (existingCart) {
            const existingProductIndex = existingCart.products.findIndex(p => p.product.toString() === productId.toString());
            console.log("existing cart index",existingProductIndex);

            if (existingProductIndex !== -1) {
                const existingProduct=existingCart.products[existingProductIndex].quantity;
                console.log("existing product quantity",existingProduct);

                // If the product is already in the cart, increase the quantity
                await cart.findOneAndUpdate(
                    { userId: userId, "products.product": productId, order_g:false},
                    { $inc: { "products.$.quantity": 1 } }
                );
            } else {
                await cart.findOneAndUpdate(
                    { $and:[ {userId: userId},{order_g:false}]},
                    {
                        $push: {
                            products: {
                                product: productId,
                                quantity: 1,
                                date: new Date(),
                                price: product.price,
                            }
                        }
                    }
                );
            }
        } else {
            const newCart = new cart({
                userId: userId,
                products: [{
                    product: productId,
                    quantity: 1,
                    date: new Date(),
                    price: product.price,
                }],
            });

            await newCart.save();
        }

        response.status(201).json({ msg: "added successfully" });
    } catch (err) {
        console.log("error in cart controller", err);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getCartController = async (request, response) => {
    try {
        const { email } = request.body;
        console.log("email", email);

        const userIdObj = await users.aggregate([
            { $match: { email: email } },
            { $project: { _id: 1 } }
        ]);
        console.log("userId", userIdObj);
        const userId = userIdObj[0]._id;

        const cartItems = await cart.aggregate([
            {
                $match: { $and:[ {userId: userId},{order_g:false}] }
            },
            {
                $unwind: "$products"
            },
            {
                $lookup: {
                    from: 'grains',
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $project: {
                    productId: '$products.product',
                    quantity: '$products.quantity',
                    date: '$products.date',
                    price: '$products.price',
                    productName: '$productDetails.name',
                    productDescription: '$productDetails.description',
                    grainname: '$productDetails.grainname',
                    image: '$productDetails.image'
                }
            }
        ]);

        console.log(cartItems);

        response.status(200).json(cartItems);
    } catch (err) {
        console.log("error in get cart controller", err);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateCartController = async (request, response) => {
    const { _id, productId, quantity, email } = request.body;
    console.log("inside update cart", _id, email, productId, quantity);
    const pid = new ObjectId(productId)
    const checkGrain = await grains.findOne({ _id: pid });
    if (checkGrain.quantity < quantity)
        response.status(500).json({ msg: "invalid quantity" });
    try {
        const result = await cart.updateOne(
            { _id: new ObjectId(_id), 'products.product': pid },
            { $set: { 'products.$.quantity': quantity } }
        );

        if (result.modifiedCount === 1) {
            response.status(200).json({ msg: 'Product quantity updated successfully' });
        } else {
            console.log("cart...............", result)
            response.status(404).json({ error: 'Product not found in the cart' });
        }
    } catch (error) {
        console.error('Error updating product quantity:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

}

export const removeCartController = async(request, response) => {
    const { cartId, productId } = request.body;
    console.log("inside removecart",cartId, productId)
    const result =await cart.updateOne({ _id: new ObjectId( cartId) },
        { $pull: { products: { product: new ObjectId(productId) } } },
        
    )
   
    if (result.modifiedCount === 0) {
        console.log("removed successfully",result)

        return response.status(404).json({ msg: "product not found in the cart" })
    } else {
        console.log("removed successfully",result)
        return response.status(200).json({ msg: "removed successfully" })
    }

    }
    export const addcartEqpController=async (request, response) => {
        try {
            const { _id, email } = request.body;
            console.log("id email in EquipmentCart", _id, email);
    
            const productId = new ObjectId(_id);
    
            const product = await equipments.findOne({ _id: productId });
    
            const userIdObj = await users.aggregate([
                { $match: { email: email } },
                { $project: { _id: 1 } }
            ]);
            console.log("userId", userIdObj);
            const userId = userIdObj[0]._id;
    
            const existingCart = await cartEqp.findOne({ $and:[ {userId: userId},{order_e:false}] });
    
            if (existingCart) {
                const existingProductIndex = existingCart.equips.findIndex(p => p.product.toString() === productId.toString());
                console.log("existing cart",existingCart);
    
                if (existingProductIndex !== -1) {
                    const existingProduct=existingCart.equips[existingProductIndex].quantity;
                    console.log("existing product quantity",existingProduct);
    
                    // If the product is already in the cart, increase the quantity
                    await cartEqp.findOneAndUpdate(
                        { userId: userId, "equips.product": productId, order_e:false },
                        { $inc: { "equips.$.quantity": 1 } }
                    );
                } else {
                    await cartEqp.findOneAndUpdate(
                       { $and:[ {userId: userId},{order_e:false}]},
                        {
                            $push: {
                                equips: {
                                    product: productId,
                                    quantity: 1,
                                    date: new Date(),
                                    price: product.price,
                                }
                            }
                        }
                    );
                }
            } else {
                const newCart = new cartEqp({
                    userId: userId,
                    equips: [{
                        product: productId,
                        quantity: 1,
                        date: new Date(),
                        price: product.price,
                    }],
                });
    
                await newCart.save();
            }
    
            response.status(201).json({ msg: "Equipment added successfully" });
        } catch (err) {
            console.log("error in Equipent cart controller", err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    export const equipmentCartController= async (request, response) => {
        try {
            const { email } = request.body;
            console.log("email", email);
    
            const userIdObj = await users.aggregate([
                { $match: { email: email } },
                { $project: { _id: 1 } }
            ]);
            console.log("userId", userIdObj);
            const userId = userIdObj[0]._id;
    
            const cartItems = await cartEqp.aggregate([

                {
                    $match: {$and:[ {userId: userId },{order_e:false}]}
                },
                {
                    $unwind: "$equips"
                },
                {
                    $lookup: {
                        from: 'equipments',
                        localField: 'equips.product',
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                },
                {
                    $unwind: "$productDetails"
                },
                {
                    $project: {
                        productId: '$equips.product',
                        quantity: '$equips.quantity',
                        date: '$equips.date',
                        price: '$equips.price',
                        productName: '$productDetails.name',
                        productDescription: '$productDetails.description',
                        grainname: '$productDetails.grainname',
                        image: '$productDetails.image'
                    }
                }
            ]);
    
            console.log(cartItems);
    
            response.status(200).json(cartItems);
        } catch (err) {
            console.log("error in get equipment cart controller", err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    export const updateCartequipmentController=async (request, response) => {
        const { _id, productId, quantity, email } = request.body;
        console.log("inside update equipment cart", _id, email, productId, quantity);
        const pid = new ObjectId(productId)
        const checkEquip = await equipments.findOne({ _id: pid });
        console.log("checEquip",checkEquip);
        if (checkEquip.quantity < quantity)
            response.status(500).json({ msg: "invalid quantity" });
    
        try {
            const result = await cartEqp.updateOne(
                { _id: new ObjectId(_id), 'equips.product': pid },
                { $set: { 'equips.$.quantity': quantity } }
            );
    
            if (result.modifiedCount === 1) {
                response.status(200).json({ msg: 'equipment quantity updated successfully' });
            } else {
                console.log("Equipment cart...............", result)
                response.status(404).json({ error: 'equipment not found in the cart' });
            }
        } catch (error) {
            console.error('Error updating equipment quantity:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    
    }
    
    export const removeCartequipmentController=async(request, response) => {
        const { cartId, productId } = request.body;
        console.log("inside removecart equipment",cartId, productId)
        const result =await cartEqp.updateOne({ _id: new ObjectId( cartId) },
            { $pull: { equips: { product: new ObjectId(productId) } } },
            
        )
        if (result.modifiedCount === 0) {
            console.log("removed successfully",result)
    
            return response.status(404).json({ msg: "product not found in the cart" })
        } else {
            console.log("removed successfully",result)
            return response.status(200).json({ msg: "removed successfully" })
        }
    
        }

       export const grainTotalorderController=async(request,response)=>{
            try{
                const order=await grainOrder.find();
                console.log("order in grain Order",order);
                response.status(200).json({order:order});
            }catch(err){
                console.log("error in grain order controller",err);
                response.status(500).json({msg:'error occured while getting order'});

            }
           
        }
export const bookExpertController = async (request, response) => {
    try{
        var userObj = await users.findOne({email:request.body.userEmail});
        var obj = {
            consultingTopic:request.body.consultingTopic,
            consultingType:request.body.consultingType,
            consultingDate:request.body.consultingDate,
            consultingTime:request.body.consultingTime,
            clientId:userObj._id,
            expertId:request.body.ExpertId
        }
        var result = await expertBook.create(obj);
        response.status(201).json({ message: "success" })
    }catch(err){
        console.error("Error in bookExpertController",err);
    }
}

export const expertViewDataController = async (request, response) => {  
    try {
        var obj = await users.findOne({email:request.body.email});
        var expert = obj._id;
        const result = await expertBook.aggregate([
            {
                $match: {
                    expertId: new mongoose.Types.ObjectId(expert)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'clientId',
                    foreignField: '_id',
                    as: 'client'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'expertId',
                    foreignField: '_id',
                    as: 'expert'
                }
            },
            {
                $unwind: '$client'
            },
            {
                $project: {
                    _id: 1,
                    expertId: 1,
                    clientId: 1,
                    consultingTopic: 1,
                    consultingType: 1,
                    consultingTime: 1,
                    consultingDate: 1,
                    confirm: 1,
                    'client.name': 1,
                }
            }
        ]);
        if (result.length > 0) {
            response.status(201).json({ message: "success", result });
        } else {
            response.status(500).json({ message: "Internal Server Error" });
        }
    } catch (error) {
        console.error('Error in expertViewDataController', error);
        throw error;
    }
}

export const statusVerifyupdateController = async(request, response) => {
    try{
        const {clientId} = request.body
        var userObj = await expertBook.findOne({clientId:clientId});
        var confirm = userObj.confirm;
        if(confirm==false){
            await expertBook.updateOne({clientId:clientId},{$set:{confirm:true}});
        }
        else{
            await expertBook.updateOne({clientId:clientId},{$set:{confirm:false}});
        }
        response.status(201).json({message:"success"})
    }catch(err){
        console.error("Error in statusVerifyupdateController ",err);
        response.status(500).json({message:"Internal server error"})
    }
}

export const declineColdStRequestController = async (request, response) => {
    try {
        const result = await contractLandColdModel.updateOne({ _id: request.body._id }, { $set: { userStatus: false, description: request.body.description } });
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in declineColdStRequestController", err);
        response.status(500).json({ message: "Server Error!!" })
    }
}

export const declineRequestController = async(request, response) => {
    try{
        const result =await contractLandModel.updateOne({_id:request.body._id},{$set:{userStatus:false,description:request.body.description}});
        response.status(201).json({message:"success"})
    }catch(err){
        console.error("Error in declineRequestController",err);
        response.status(500).json({message:"Server Error!!"})
    }
}

export const acceptColdStRequestController = async (request, response) => {
    var price = ((25 / 100) * request.body.price) + request.body.price;
    try {
        const result = await contractLandColdModel.updateOne({ _id: request.body._id }, { $set: { userStatus: true, description: request.body.description, price: price } });
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in acceptColdStRequestController", err);
        response.status(500).json({ message: "Server Error!!" })
    }
}

export const acceptRequestController = async(request, response) => {
    try{
        const result =await contractLandModel.updateOne({_id:request.body._id},{$set:{userStatus:true,description:request.body.description,price:request.body.price}});
        response.status(201).json({message:"success"})
    }catch(err){
        console.error("Error in acceptRequestController",err);
        response.status(500).json({message:"Server Error!!"})
    }
}

export const addMessageController = async(request,response)=>{
    try {
        console.log(request.body);
        var messageObj = request.body;
        var result = await contact.create(messageObj);
        response.status(201).json({ message: "success",});
    } catch (error) {
        console.error("Error in addMessageController"+error);
        response.status(500).json("Erro in add message controller");
    }
}


export const farmerSignAgreementController = async(request,response)=>{
    try {
        const result =await contractLandModel.updateOne({_id:request.body._id},{$set:{farmerSign:request.body.farmerSign}});
        response.status(201).json({ message: "success",});
    } catch (error) {
        console.error("Error in farmerSignAgreementController"+error);
        response.status(500).json("Erro in add message controller");
    }
}

export const farmerSignedAgreementCdController = async(request,response)=>{
    try {
        const result =await contractLandColdModel.updateOne({_id:request.body._id},{$set:{farmerSign:request.body.farmerSign}});
        response.status(201).json({ message: "success",});
    } catch (error) {
        console.error("Error in farmerSignedAgreementCdController "+error);
        response.status(500).json("Erro in add message controller");
    }
}

export const getDataForAgreementController = async (request, response) => {
    try {
        const userEmail = request.params.email;
        const user = await users.findOne({ email: userEmail });
        const userAgriLands = await agriLand.find({ ownerEmail: userEmail });
        const landIds = userAgriLands.map(land => land._id);
        const contracts = await contractLandModel.find({ landId: { $in: landIds } });
        const factoryOwnerIds = contracts.map(contract => contract.factoryOwnerId);
        const organisationsResult = await organisations.find({ _id: { $in: factoryOwnerIds } });
        const mergedResults = contracts.map(contract => {
            const agriLand = userAgriLands.find(land => land._id.equals(contract.landId));
            const organisation = organisationsResult.find(org => org._id.equals(contract.factoryOwnerId));
            return {
                user,
                agriLand,
                contract,
                organisation
            };
        });
        response.status(201).json(mergedResults);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
export const getDataForAgreementColdController = async (request, response) => {
    try {
        const userEmail = request.params.email;
        const user = await users.findOne({ email: userEmail });
        const userColdLands = await coldStLands.find({ userEmail: userEmail });
        const landIds = userColdLands.map(land => land._id);
        const contracts = await contractLandColdModel.find({ landId: { $in: landIds } });
        const tenatIds = contracts.map(contract => contract.tenatId);
        const organisationsResult = await organisations.find({ _id: { $in: tenatIds } });
        const mergedResults = contracts.map(contract => {
            const coldLand = userColdLands.find(land => land._id.equals(contract.landId));
            const organisation = organisationsResult.find(org => org._id.equals(contract.tenatId));
            return {
                user,
                coldLand,
                contract,
                organisation
            };
        });
        console.log("mergedResults",mergedResults);
        response.status(201).json(mergedResults);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
