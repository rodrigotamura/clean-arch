import ParkingLot from "../../core/entities/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";

export default class ParkingLotRespositoryMemory implements ParkingLotRepository {
  
  getParkingLot(code: string): Promise<ParkingLot> {
    return Promise.resolve(new ParkingLot("shopping", 100, 8, 22));
  }

}