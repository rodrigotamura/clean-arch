import Express from 'express';
import ExpressAdapter from '../../adapter/ExpressAdapter';
import ParkingLotController from '../../controller/ParkingLotController';
const app = new Express();

// Wrong case: coupled - express (framework) is knowing about use case
// it's missing the interface adapters
/*
import GetParkingLot from '../../core/usecase/GetParkingLot';
import ParkingLotRepositorySQL from '../repository/ParkingLotRepositorySQL';
app.get('/parkingLots/:code', async function (req, res) {
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
  const parkingLot = await getParkingLot.execute(req.params.code)
  res.json(parkingLot);
});
*/

app.get('/parkingLots/:code', ExpressAdapter.create(
  ParkingLotController.getParkingLot)
);

app.listen(3000);