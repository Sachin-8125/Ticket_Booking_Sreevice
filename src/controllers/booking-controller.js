const { StatusCodes } = require('http-status-codes');

const {BookingService} = require('../services/index');

const bookingService = new BookingService();
const create = async(req,res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully completed booking',
            success: true,
            error: {},
            data: response
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
            error: error.explanation,
            data: {}
        });
    }
}
module.exports = {
    create

}