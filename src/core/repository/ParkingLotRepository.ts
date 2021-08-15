import ParkingLot from '../entities/ParkingLot'
// It could be data access instead repository

export default interface ParkingLotRepository {
  getParkingLot(code: string): Promise<ParkingLot>;
}