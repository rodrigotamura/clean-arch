import GetParkingLot from "../core/usecase/GetParkingLot";
import ParkingLotRepositorySQL from "../infra/repository/ParkingLotRepositorySQL";

// it purpose is to be a kind of a gateway to domain layer
export default class ParkingLotController {
  static async getParkingLot(params, body) {
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
    const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
    // in this case, it must not have `req`, because it is from Express
    // if we have another framework it should be diffent
    // const parkingLot = await getParkingLot.execute(req.params.code);
    // correct:
    const parkingLot = await getParkingLot.execute(params.code);
    return parkingLot;
  }
}