import mongoose from "mongoose";

const orgModel = new mongoose.Schema({
    org_email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    },
    dealer_name: {
        type: String,
        required: true
    },
    dealer_email: {
        type: String,
        required: true
    },
    dealer_contact: {
        type: Number,
        required: true,
    },
    company_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip_code: {
        type: Number,
        required: true,
    },
    reg_number: {
        type: String,
        unique: true,
        required: true,
    },
    org_image: {
        type: String,
        required: true
    },
    org_description: {
        type: String,
        required: true
    },
    org_type: {
        type: String,
        required: true
    },
    reg_name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active"
    },
    verify_status: {
        type: Boolean,
        default: false
    }
});

const contractLand = new mongoose.Schema({
    landId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agriLand', 
        required: true
    },
    factoryOwnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organisations', 
        required: true
    },
    grainName:{
        type:String
    },
    quantity:{
        type:Number
    },
    timeDuration:{
        type:Number
    },
    description: {
        type: String
    },
    userStatus:{
        type:Boolean
    },
    price:{
        type:Number
    }, 
    orgSign: {
        type: String
    }, 
    farmerSign: {
        type: String
    },
    agreementDate:{
        type:Date
    }
},{
    timestamps:true
})

const contractLandColtSt = new mongoose.Schema({
    landId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agriLand',
        required: true
    },
    tenatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organisations',
        required: true
    },
    timeDuration: {
        type: Number
    },
    itemType: {
        type: String
    },
    description: {
        type: String
    },
    userStatus: {
        type: Boolean
    },
    price: {
        type: Number
    }, 
    orgSign: {
        type: String
    }, 
    farmerSign: {
        type: String
    },
    agreementDate:{
        type:Date
    },
    paymentStatus:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})


const contractLandColdModel = mongoose.model('contractLandColtSt', contractLandColtSt, 'contractLandColtSt');
const contractLandModel = mongoose.model('contractLand', contractLand, 'contractLand');
const organisations = mongoose.model('organisations', orgModel, 'organisations');
export default organisations;
export {contractLandModel,contractLandColdModel};