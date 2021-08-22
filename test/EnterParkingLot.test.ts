import EnterParkingLot from '../src/core/usecase/EnterParkingLot';
import GetParkingLot from '../src/core/usecase/GetParkingLot';
import ParkingLotRespositoryMemory from '../src/infra/repository/ParkingLotRepositoryMemory';
import ParkingLotRepositorySQL from '../src/infra/repository/ParkingLotRepositorySQL';

test('Should get parking lot', async function() {
  // const parkingLotRepositoryMemory = new ParkingLotRespositoryMemory();
  // const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);

  const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
  
  const parkingLot = await getParkingLot.execute('shopping');

  expect(parkingLot.code).toBe('shopping');
});

test('Should be closed', async function() {
  // using memory
  // const parkingLotRepositoryMemory = new ParkingLotRespositoryMemory();
  // const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
  // const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);

  // using SQL
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
  const enterParkingLot = new EnterParkingLot(parkingLotRepositorySQL);
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
  
  const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

  await enterParkingLot.execute('shopping', 'ABC-1234', new Date('2021-03-01T23:45:00'));
  
  const parkingLotAfterEnter = await getParkingLot.execute('shopping');
  expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
});

test('Should be full', async function() {
  const parkingLotRepositoryMemory = new ParkingLotRespositoryMemory();

  const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
  
  const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
  
  const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

  await enterParkingLot.execute('shopping', 'ABC-1234', new Date('2021-03-01T11:45:00'));
  await enterParkingLot.execute('shopping', 'ABC-1235', new Date('2021-03-01T11:45:00'));
  await enterParkingLot.execute('shopping', 'ABC-1236', new Date('2021-03-01T11:45:00'));
  await enterParkingLot.execute('shopping', 'ABC-1237', new Date('2021-03-01T11:45:00'));
  await enterParkingLot.execute('shopping', 'ABC-1238', new Date('2021-03-01T11:45:00'));
  await enterParkingLot.execute('shopping', 'ABC-1239', new Date('2021-03-01T11:45:00'));
  await enterParkingLot.execute('shopping', 'ABC-1230', new Date('2021-03-01T11:45:00'));
  
  const parkingLotAfterEnter = await getParkingLot.execute('shopping');
  expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
});