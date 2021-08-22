// Memory due to use memory in order to store parking lots

import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkingLot from "../../core/entities/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";

export default class ParkingLotRespositoryMemory implements ParkingLotRepository {

  parkingLots = [
    { 
      code:"shopping", 
      capacity: 5, 
      openHour: 8, 
      closeHour: 22, 
      occupiedSpaces: 0
    } // este new está errado pq ainda não falamos de adaptadores
  ];
  parkedCars = [];
  
  getParkingLot(code: string): Promise<ParkingLot> {
    const parkingLotData = this.parkingLots.find(parkingLot => parkingLot.code === code);
    const occupiedSpaces = this.parkedCars.length;
    const parkingLot = ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.openHour, parkingLotData.closeHour, occupiedSpaces)
    return Promise.resolve(parkingLot);
  }
    
  saveParkedCar(code: string, plate: string, date: Date): void {
    this.parkedCars.push({code, plate, date});
  }
}