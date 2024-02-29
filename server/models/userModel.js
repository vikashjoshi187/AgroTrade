import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    address: {
        type: String,
    },
    number: {
        type: Number
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    image: {
        type: String,
    },
    education: {
        type: String,
    },
    experience: {
        type: String,
    },
    consultancy_fee_video: {
        type: Number
    },
    consultancy_fee_chat: {
        type: Number
    },
    consultancy_type: {
        type: String,
    },
    consultancy_feild: {
        type: String,
    },
    certificate: {
        type: String,
    },
    expert_rating: {
        type: String,
    },
    expert_status: {
        type: Boolean,
        default: false
    },
    user_status: {
        type: Boolean,
        default: false
    },
    verify_status: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "active"
    }
});

const grainModel = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    grainname: {
        type: String,
        required: true
    },
    grain: {
        type: String,
        required: true
    },
    selflife: {
        type: String,
        required: true
    },
    moisturelevel: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    graintype: {
        type: String,
        required: true
    },
    admin_verify: {
        type: Boolean,
        default: false
    }

});

const equipmentModel = new mongoose.Schema({
    userEmail: {
        type: String
    },
    name: {
        type: String,
        required: true

    },
    modelnumber: {
        type: String,
    },
    equipmenttype: {
        type: String
    },
    price: {
        type: Number
    },
    condition: {
        type: String
    },
    quantity: {
        type: Number
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    avilable: {
        type: Boolean,
        default: true
    },
    admin_verify: {
        type: Boolean,
        default: false
    }
});

const coldStorageLandModel = new mongoose.Schema({
    landTitle: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String
    },
    area: {
        type: Number
    },
    pincode: {
        type: Number
    },
    rent: {
        type: Number
    },
    infrastructure: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    avilableFrom: {
        type: Date,
        required: true,
        default: Date.now()
    },
    avilableTill: {
        type: Date,
    },
    image360: {
        type: String,
    },
    avilable: {
        type: Boolean,
        default: true
    },
    admin_verify: {
        type: Boolean,
        default: false
    }
});

const agriLandModel = new mongoose.Schema({
    landTitle: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true
    },
    agriType: {
        type: String,
        required: true
    },
    soilType: {
        type: String,
        required: true
    },
    suitableFor: {
        type: Array
    },
    rent: {
        type: Number,
        required: true,
    },
    avilableFrom: {
        type: Date,
        required: true,
        default: Date.now()
    },
    avilableTill: {
        type: Date,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    infrastructure: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    image360: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    avilable: {
        type: Boolean,
        default: true
    },
    admin_verify: {
        type: Boolean,
        default: false
    }

});
// const cartSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },

//     // Embedding the product document in the cart
//     products: [{
//       product: { type: Object, required: true },
//       quantity: { type: Number, default: 1 },
//     }],

//   }, { timestamps: true });

// const cart = mongoose.model('cart', cartSchema);
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    products: [Object],
    order_g:{
        type:Boolean,
        default:false
    }
});

const cart = mongoose.model('cart', cartSchema);

const cartEqpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    equips: [Object],
    order_e:{
        type:Boolean,
        default:false
    }
});

const cartEqp = mongoose.model('cartEqp', cartEqpSchema);

const orderEquip=new mongoose.Schema({
    cart_id:{
        type:Object,
        ref:"carts",
        required:true
    },
    order_date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    shipping_address:{
        type:String
    },
    total_pay:{
        type:String
    },
    shipping:{
        type:String
    },
    delivery_days:{
        type:String
    },
    payment_id:{
        type:String
    }
});

export const equipmentOrder=mongoose.model('equipmentOrder',orderEquip,'equipmentOrder');

const orderG=new mongoose.Schema({
    cart_id:{
        type:Object,
        ref:"carts",
        required:true
    },
    order_date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    shipping_address:{
        type:String,
        required:true
    },
    total_pay:{
        type:String,
    },
    payment_id:{
        type:String
    },
    invoice:{
        type:String
    },
    delivery_days:{
        type:Number
    },
    total_qty:{
        type:Number
    }

});
export const grainOrder=mongoose.model('grainOrder',orderG,'grainOrder');

const pay=new mongoose.Schema({
    payment_id:{
        type:String,
        required:true
    },
    payer_id:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now()
    },
    amount:{
        type:Number
    },
    payment_type:{
        type:String,
        default:'online'
    }
})
export const payments=mongoose.model('payment',pay,'payment');

const payEquipment=new mongoose.Schema({
    payment_id:{
        type:String,
        required:true
    },
    payer_id:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now()
    },
    amount:{
        type:Number
    },
    payment_type:{
        type:String,
        default:'online'
    }
})
export const equipPayment=mongoose.model('equipPayment',payEquipment,'equipPayment');


const expertBookSchema = new mongoose.Schema({
    expertId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    consultingTopic: {
        type: String
    },
    consultingType: {
        type: String
    },
    consultingTime: {
        type: String
    },
    consultingDate: {
        type: Date
    },
    consultingFee: {
        type: Number
    },
    confirm: {
        type: Boolean,
        default: false
    }
});

const userMessage = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
})

// export const grainOrder=mongoose.model('grainOrder',orderG,'grainOrder');
const contact = mongoose.model('userMessage',userMessage,"userMessage");
const expertBook = mongoose.model('expertBook', expertBookSchema, 'expertBook');
const agriLand = mongoose.model('agriLand', agriLandModel, 'agriLand');
const equipments = mongoose.model('equipments', equipmentModel, 'equipments')
const users = mongoose.model('users', userModel, 'users');
const grains = mongoose.model('grains', grainModel, 'grains');
const coldStLands = mongoose.model('coldStLands', coldStorageLandModel, 'coldStLands');
export { users, grains, equipments, coldStLands, agriLand, cart,cartEqp, expertBook,contact } 