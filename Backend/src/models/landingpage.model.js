import mongoose from "mongoose";

const associationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },

    logo: {
        type: String,
        required: true  
    }
},{timestamps : true})

const Association = mongoose.model("Association", associationSchema);

const metricsSchema = new mongoose.Schema({
    plasticWasterecycled: {
        type: Number,
        required: true
    },

    carboneMissionsPrevented: {
        type: Number,
        required: true
    },

    industrialWasteConsumed: {
        type: Number,
        required: true
    },

    greenMaterialsInstalled: {
        type: Number,
        required: true
    }

},{timestamps : true})

const Metrics = mongoose.model("Metrics", metricsSchema);

const landingContentSchema = new mongoose.Schema({
    companyInfo: {
        name: String,
        description: String,
        
    },

    highlights: {
        title: String,
        description: String
    },

    achievements: {
        title: String,
        description: String,
        year: Number
    },

    metrics: {
        type: [metricsSchema],
        required: true
    },

    associations: {
        type: [associationSchema],
        required: true
    },

    clients: [{
        name :String,
        description : String,
        photo : String
    }],

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{ timestamps: true })

const Landingpage = mongoose.model("Landingpage", landingContentSchema);

export{Association, Metrics, Landingpage}