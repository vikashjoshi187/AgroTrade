import admin from "../models/adminModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { users, grains, equipments, agriLand, coldStLands, grainOrder, cart, cartEqp, equipmentOrder } from "../models/userModel.js";
import organisations from "../models/organizationModel.js"
import { sendMail } from "../middleware/nodeMailer.js";
var TEMP_SESSION = {}


export const adminLoginController = async (request, response) => {
    try {
        const { email, password } = request.body;
        var existingAdmin = await admin.findOne({ email: email });
        if (existingAdmin == null) {
            response.status(202).json({ message: 'not exist' });
        } else {
            const password_status = await bcrypt.compare(password, existingAdmin.password);
            if (password_status) {
                let payload = {};
                const SECRET_KEY = process.env.JWT_SECRET_KEY;
                payload.data = {
                    email: email,
                    role: process.env.ADMIN_ROLE
                }

                const EXPIRY_TIME = {
                    expiresIn: '6d'
                }
                var token = jwt.sign(payload, SECRET_KEY, EXPIRY_TIME);
                console.log("Login Successfully");

                var logData = await admin.findOne(
                    { email: email },
                    { password: 0, _id: 0, __v: 0 }
                );
                console.log("LogData : ", logData);
                response.status(201).json({ message: 'success', token: token, log: logData, role: process.env.ADMIN_ROLE });
            }
            else {
                console.error("Password does'nt match");
                response.status(200).json({ message: 'wrong password' });
            }
        }
    } catch (err) {
        console.error("Error in adminLoginController", err);
        response.status(500).json({ message: 'Internnal Server Error!!' });
    }
}

export const adminGetUserListController = async (request, response) => {
    console.log("inside adminGetUserListController");
    try {
        var result = await users.find({ expert_status: false, user_status: true });
        console.log("result", result);
        response.status(200).json({ result })
    } catch (err) {
        console.error("Error in adminGetUserListController", err);
        response.status(500).json({ message: "Internal servwer Error!! " })
    }
}

export const adminGetOrganizationListController = async (request, response) => {
    try {
        var result = await organisations.find();
        console.log("result", result);
        response.status(200).json({ result })
    } catch (err) {
        console.error("Error in adminGetOrganizationListController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const adminViewsGrainController = async (request, response) => {
    try {
        var result = await grains.find();
        console.log("result", result);
        response.status(200).json({ result })
    } catch (err) {
        console.error("Error in adminViewsGrainController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const statusUpdateController = async (request, response) => {
    try {
        const { _id } = request.body
        var orgObj = await organisations.findOne({ _id: _id });
        var status = orgObj.status;
        if (status == "active") {
            await organisations.updateOne({ _id: _id }, { $set: { status: "deactive" } });
        }
        else {
            await organisations.updateOne({ _id: _id }, { $set: { status: "active" } });

        }
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in statusUpdateController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const statusUserController = async (request, response) => {
    try {
        const { _id } = request.body
        var userObj = await users.findOne({ _id: _id });
        var status = userObj.status;
        if (status == "active") {
            await users.updateOne({ _id: _id }, { $set: { status: "deactive" } });
        }
        else {
            await users.updateOne({ _id: _id }, { $set: { status: "active" } });
        }
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in statusUserController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const statusExpertController = async (request, response) => {
    try {
        const { _id } = request.body
        var userObj = await users.findOne({ _id: _id });
        var status = userObj.status;
        if (status == "active") {
            await users.updateOne({ _id: _id }, { $set: { status: "deactive" } });
        }
        else {
            await users.updateOne({ _id: _id }, { $set: { status: "active" } });
        }
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in statusExpertController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const statusVerifyController = async (request, response) => {
    try {
        const { _id } = request.body
        var orgObj = await organisations.findOne({ _id: _id });
        var verify_status = orgObj.verify_status;
        if (verify_status == false) {
            await organisations.updateOne({ _id: _id }, { $set: { verify_status: true } });
        }
        else {
            await organisations.updateOne({ _id: _id }, { $set: { verify_status: false } });
        }
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in statusVerifyController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const statusVerifyupdateController = async (request, response) => {
    try {
        const { _id } = request.body
        var userObj = await users.findOne({ _id: _id });
        var verify_status = userObj.verify_status;
        if (verify_status == false) {
            await users.updateOne({ _id: _id }, { $set: { verify_status: true } });
        }
        else {
            await users.updateOne({ _id: _id }, { $set: { verify_status: false } });
        }
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in statusVerifyupdateController", err);
        response.status(500).json({ message: "Internal server Error!!" });
    }
}

export const statusVerifyExpertController = async (request, response) => {
    try {
        const { _id } = request.body
        var userObj = await users.findOne({ _id: _id });
        var verify_status = userObj.verify_status;
        if (verify_status == false) {
            await users.updateOne({ _id: _id }, { $set: { verify_status: true } });
        }
        else {
            await users.updateOne({ _id: _id }, { $set: { verify_status: false } });
        }
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in statusVerifyExpertController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const verifyAdminStatusController = async (request, response) => {
    try {
        const { _id } = request.body
        var userObj = await grains.findOne({ _id: _id });
        var admin_verify = userObj.admin_verify;
        if (admin_verify == false) {
            await grains.updateOne({ _id: _id }, { $set: { admin_verify: true } });
        }
        else {
            await grains.updateOne({ _id: _id }, { $set: { admin_verify: false } });
        }
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in verifyAdminStatusController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const verifyStatusAdminController = async (request, response) => {
    try {
        const { _id } = request.body
        var userObj = await equipments.findOne({ _id: _id });
        var admin_verify = userObj.admin_verify;
        if (admin_verify == false) {
            await equipments.updateOne({ _id: _id }, { $set: { admin_verify: true } });
        }
        else {
            await equipments.updateOne({ _id: _id }, { $set: { admin_verify: false } });
        }
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in verifyStatusAdminController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const verifyAdminStatusAgController = async (request, response) => {
    try {
        const { _id } = request.body
        var userObj = await agriLand.findOne({ _id: _id });
        var admin_verify = userObj.admin_verify;
        if (admin_verify == false) {
            await agriLand.updateOne({ _id: _id }, { $set: { admin_verify: true } });
        }
        else {
            await agriLand.updateOne({ _id: _id }, { $set: { admin_verify: false } });
        }
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in verifyAdminStatusAgController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const verifyAdminStatusColdController = async (request, response) => {
    try {
        const { _id } = request.body
        var userObj = await coldStLands.findOne({ _id: _id });
        var admin_verify = userObj.admin_verify;
        if (admin_verify == false) {
            await coldStLands.updateOne({ _id: _id }, { $set: { admin_verify: true } });
        }
        else {
            await coldStLands.updateOne({ _id: _id }, { $set: { admin_verify: false } });
        }
        response.status(201).json({ message: "success" })
    } catch (err) {
        console.error("Error in verifyAdminStatusColdController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const adminGetExpertListController = async (request, response) => {
    try {
        var result = await users.find({ expert_status: true });
        response.status(200).json({ result })
    } catch (err) {
        console.error("Error in adminGetExpertListController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const adminVeiwEquipmentController = async (request, response) => {
    try {
        var result = await equipments.find();
        response.status(200).json({ result })
    } catch (err) {
        console.error("Error in adminVeiwEquipmentController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const adminViewsAgriLandController = async (request, response) => {
    try {
        var result = await agriLand.find();
        response.status(200).json({ result })
    } catch (err) {
        console.error("Error in adminViewsAgriLandController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const adminColdStLandController = async (request, response) => {
    try {
        var result = await coldStLands.find();
        response.status(200).json({ result })
    } catch (err) {
        console.error("Error in adminViewsAgriLandController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const adminGetOtpController = async (request, response) => {
    console.log(request.body);
    var check = true;
    const { email, password } = request.body;
    var min = 1000;
    var max = 9999;
    var otp = Math.floor(Math.random() * (max - min + 1)) + min;
    var subject = `Welcome to Agrotrade - Your Ultimate Agriculture Solution!`;
    var body = `Thank you for choosing us as your trusted partner for all your Grains and Equipments Need. Our team is dedicated to providing you with a seamless and convenient experience for your Agriculture requirements.
    Your One time Password is ${otp}`;
    var html = '';
    try {

        if (request.body.message == "admin change password") {
            var checkAdmin = await admin.findOne({ email: email });
            console.log('checkAdmin', checkAdmin);
            if (!checkAdmin) {
                check = false;
            }

        }
        if (check) {
            console.log("inside admin before");
            sendMail(email, subject, body, html);
            console.log("inside admin after");
            var hashed_password = await bcrypt.hash(password, 10)


            TEMP_SESSION.email = email;
            TEMP_SESSION.password = hashed_password;
            TEMP_SESSION.otp = otp;

            console.log("Email Sended Successfully. Otp : ", otp);
            response.status(201).json({ message: "success" });
        } else {
            // response.status(200).json({message:"not exist"});
            console.log('err in get otp');

            response.status(500).json({ message: "error" })
        }
    } catch (error) {
        console.error("Error while sending Email : ", error);
        response.status(500).json({ message: "error" })
    }
}


export const adminCheckOtpController = async (request, response) => {
    console.log("request.body", request.body);
    const { otp } = request.body;
    if (TEMP_SESSION.otp == otp) {
        response.status(200).json({ message: 'success' });
    }
    else {
        response.status(204).json({ message: `don't match` });
    }
}

export const adminChangePasswordController = async (request, response) => {
    const { password } = request.body;
    const hashed_password = await bcrypt.hash(password, 10)
    try {
        var result = await admin.updateOne(
            { email: TEMP_SESSION.email },
            {
                $set:
                    { password: hashed_password }
            }
        );
        response.status(200).json({ message: 'success' });
    }
    catch (error) {
        console.log("Error while changing Password : ", error);
        response.status(204).json({ message: `error` });
    }
}

export const adminViewsGrainOrderController = async (request, response) => {
    try {
        grainOrder.find({})
            .populate({
                path: 'cart_id',
                model: 'cart',
                populate: {
                    path: 'userId',
                    model: 'users'
                }
            })
            .then(orders => {
                const promises = orders.map(order => {
                    return mongoose.model('cart').populate(order.cart_id, { path: 'products.product', model: 'grains' })
                        .then(populatedCart => {
                            order.cart_id = populatedCart;
                            return order;
                        })
                        .catch(err => {
                            console.error(err);
                        });
                });
                return Promise.all(promises);
            })
            .then(populatedOrders => {
                response.status(200).json({ populatedOrders })
            })
            .catch(err => {
                console.error(err);
            });
    } catch (err) {
        console.error("Error in adminViewsGrainOrderController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}

export const adminViewsEqupOrderController = async (request, response) => {
    try {
        equipmentOrder.find({})
            .populate({
                path: 'cart_id',
                model: 'cartEqp',
                populate: {
                    path: 'userId',
                    model: 'users'
                }
            })
            .then(orders => {
                const promises = orders.map(order => {
                    return mongoose.model('cart').populate(order.cart_id, { path: 'equips.product', model: 'equipments' })
                        .then(populatedCart => {
                            order.cart_id = populatedCart;
                            return order;
                        })
                        .catch(err => {
                            console.error(err);
                        });
                });
                return Promise.all(promises);
            })
            .then(populatedOrders => {
                console.log("populatedOrders", populatedOrders);
                response.status(200).json({ populatedOrders })
            })
            .catch(err => {
                console.error(err);
            });
    } catch (err) {
        console.error("Error in adminViewsGrainOrderController", err);
        response.status(500).json({ message: "Internal server Error!!" })
    }
}