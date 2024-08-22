const axios = require('axios');

const {BookingRepository} = require('../repository/booking-repository');
const {FLIGHT_SERVCIE_PATH} = require('../config/serverConfig');
const {ServiceError} = require('../utils/errors');
class BookingService{
    constructor(){
        this.BookingRepository = new BookingRepository();
    }
    async createBooking(data){
       try {
        const flightId = data.flightId;
        const getFlightRequestURL = `${FLIGHT_SERVCIE_PATH}/api/v1/flights/${flightId}`;
        const response = await axios.get(getFlightRequestURL);
        const flightData = response.data.data;
        let priceOfTheFlight = flightData.price;
        if(data.noOfSeats>flightData.totalSeats){
            throw new ServiceError('Something went wrong in the booking process','Insufficients seats in the flight');
        }
        const totalCost = priceOfTheFlight * data.noOfSeats;
        const bookingPayload = {...data,totalCost};
        const booking = await this.BookingRepository.create(bookingPayload);
        const updateFlightRequestURL = `${FLIGHT_SERVCIE_PATH}/api/v1/flights/${booking.flightId}`;
        await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalCost-booking,noOfSeats});
        const finalBooking =  this.BookingRepository.update(booking.id,{status:"Booked"});
        return finalBooking;

       } catch (error) {
        if(error.name=='RepositoryError'|| error.name=='ValidationError'){
            throw error;
        }
        throw new ServiceError();
       }

    }

}

module.exports = BookingService;