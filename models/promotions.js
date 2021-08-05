const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var promotionSchema = new Schema({
   name: {
       type: String,
       required: true
   },
    image: {
       type: String,
        required: true
    },
    label: {
       type: String,
        required: true,
        default: ''
    },
    price: {
       type: Currency,
        required: true
    },
    description: {
       type: String,
        required: true
    },
    featured: {
       type: Boolean,
        default: false
    }
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;