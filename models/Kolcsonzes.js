const mongoose = require('mongoose')

const KolcsonzesSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true,
		unique: true
	},
	customerName: {
		type: String,
		required: [true, 'A név megadása kötelező!'],
		unique: true,
		trim: true,
		lowercase: true,
		maxlength: [50, 'A név nem lehet hosszabb 50 karakternél!']
	},
	fromDate: {
		type: Date
	},
	days: {
		type: Number
	},
	pricePerDay: {
		type: Number
	},
	abroad: {
		type: Boolean
	},
	carId: {
		type: Number,
		ref: 'Auto'
	}
})

module.exports = mongoose.model('Kolcsonzes', KolcsonzesSchema, 'rentals')