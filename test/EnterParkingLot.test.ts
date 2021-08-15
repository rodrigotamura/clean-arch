import EnterParkingLot from "../src/core/usecase/EnterParkingLot";
import ParkingLotRespositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";

test("Should enter parking lot", async function() {
  const parkingLotRepositoryMemory = new ParkingLotRespositoryMemory();
  const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
  const parkingLot = await enterParkingLot.execute("shopping");
  expect(parkingLot.code).toBe("shopping");
})