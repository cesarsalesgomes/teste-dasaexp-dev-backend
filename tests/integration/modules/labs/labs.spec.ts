import { TestService } from 'tests/integration/config/test.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Status } from '@src/common/enums/Status';
import LabsEntity from '@src/business/labs/labs.entity';
import { States } from '@src/business/labs/labs.enum';
import { LAB_NOT_FOUND_ERROR } from '@src/business/labs/labs.error';
import { getTestModule } from '../../config/getTestModule';
import { mockActiveLab, mockNotActiveLab, mockActiveLab2 } from './mock';

describe('Labs Tests', () => {
  let app: INestApplication;
  let testService: TestService;

  beforeEach(async () => {
    ({ app, testService } = await getTestModule());

    await testService.cleanAll();
  });
  afterEach(async () => testService.closeDbConnection());

  test(`
    1: should create an active lab with success
    2: should check if lab is returned when getting active labs and check values
  `, async () => {
    /* 1 */
    await request(app.getHttpServer())
      .post('/labs')
      .send(mockActiveLab)
      .expect(201);

    /* 2 */
    const activeLabs: LabsEntity[] = (await request(app.getHttpServer())
      .get('/labs')
      .expect(200)).body;

    expect(activeLabs.length).toBeGreaterThan(0);

    expect(activeLabs[0].name).toEqual('Dasa Laboratório #1');
    expect(activeLabs[0].postcode).toEqual('04734001');
    expect(activeLabs[0].state).toEqual(States.SP);
    expect(activeLabs[0].city).toEqual('São Paulo');
    expect(activeLabs[0].street).toEqual('Avenida Adolfo Pinheiro');
    expect(activeLabs[0].number).toEqual('1823');
    expect(activeLabs[0].neighborhood).toEqual('Santo Amaro');
    expect(activeLabs[0].additionalInfo).toEqual('Ao lado da banca');
    expect(activeLabs[0].status).toEqual(Status.ATIVO);
  });

  test(`
    1: should create an not active lab with success
    2: should check if zero labs are returned when getting active labs
  `, async () => {
    /* 1 */
    await request(app.getHttpServer())
      .post('/labs')
      .send(mockNotActiveLab)
      .expect(201);

    /* 2 */
    const activeLabs: LabsEntity[] = (await request(app.getHttpServer())
      .get('/labs')
      .expect(200)).body;

    expect(activeLabs.length).not.toBeGreaterThan(0);
  });

  test(`
    1: should create labs in batch with success
    2: should check if the labs are returned when getting active labs
  `, async () => {
    /* 1 */
    await request(app.getHttpServer())
      .post('/labs/batch')
      .send([mockActiveLab, mockActiveLab2])
      .expect(201);

    /* 2 */
    const activeLabs: LabsEntity[] = (await request(app.getHttpServer())
      .get('/labs')
      .expect(200)).body;

    expect(activeLabs.length).toBeGreaterThan(0);

    expect(activeLabs.length).toBeGreaterThan(0);

    expect(activeLabs[0].name).toEqual('Dasa Laboratório #1');
    expect(activeLabs[0].postcode).toEqual('04734001');
    expect(activeLabs[0].state).toEqual(States.SP);
    expect(activeLabs[0].city).toEqual('São Paulo');
    expect(activeLabs[0].street).toEqual('Avenida Adolfo Pinheiro');
    expect(activeLabs[0].number).toEqual('1823');
    expect(activeLabs[0].neighborhood).toEqual('Santo Amaro');
    expect(activeLabs[0].additionalInfo).toEqual('Ao lado da banca');
    expect(activeLabs[0].status).toEqual(Status.ATIVO);

    expect(activeLabs[1].name).toEqual('Dasa Laboratório #3');
    expect(activeLabs[1].postcode).toEqual('37800000');
    expect(activeLabs[1].state).toEqual(States.MG);
    expect(activeLabs[1].city).toEqual('Guaxupé');
    expect(activeLabs[1].street).toEqual('Rua Ivo Martins');
    expect(activeLabs[1].number).toEqual('170');
    expect(activeLabs[1].neighborhood).toEqual('Vila Meziara');
    expect(activeLabs[1].additionalInfo).toEqual('Próximo ao ponto');
    expect(activeLabs[1].status).toEqual(Status.ATIVO);
  });

  test(`
    1: should create an active lab with success
    2: should deactivate lab with success
    3: should check if lab is not returned when getting active labs
  `, async () => {
    /* 1 */
    const activeLab = (await request(app.getHttpServer())
      .post('/labs')
      .send(mockActiveLab)
      .expect(201)).body;

    /* 2 */
    await request(app.getHttpServer())
      .delete(`/labs/${activeLab.id}`)
      .send(mockActiveLab)
      .expect(200);

    /* 3 */
    const activeLabs: LabsEntity[] = (await request(app.getHttpServer())
      .get('/labs')
      .expect(200)).body;

    expect(activeLabs.length).not.toBeGreaterThan(0);
  });

  test(`
    1: should create an active lab with success
    2: should update lab with success
    2: should check if lab is returned when getting active labs and check values
  `, async () => {
    /* 1 */
    const activeLab = (await request(app.getHttpServer())
      .post('/labs')
      .send(mockActiveLab)
      .expect(201)).body;

    /* 2 */
    await request(app.getHttpServer())
      .put(`/labs/${activeLab.id}`)
      .send(mockActiveLab2)
      .expect(200);

    /* 3 */
    const activeLabs: LabsEntity[] = (await request(app.getHttpServer())
      .get('/labs')
      .expect(200)).body;

    expect(activeLabs.length).toBeGreaterThan(0);

    expect(activeLabs[0].name).toEqual('Dasa Laboratório #3');
    expect(activeLabs[0].postcode).toEqual('37800000');
    expect(activeLabs[0].state).toEqual(States.MG);
    expect(activeLabs[0].city).toEqual('Guaxupé');
    expect(activeLabs[0].street).toEqual('Rua Ivo Martins');
    expect(activeLabs[0].number).toEqual('170');
    expect(activeLabs[0].neighborhood).toEqual('Vila Meziara');
    expect(activeLabs[0].additionalInfo).toEqual('Próximo ao ponto');
    expect(activeLabs[0].status).toEqual(Status.ATIVO);
  });

  test('should throw not found lab error when updating not existing lab', async () => {
    const response = (await request(app.getHttpServer())
      .put('/labs/1')
      .send(mockActiveLab)
      .expect(500)).body;

    expect(response.message).toEqual(LAB_NOT_FOUND_ERROR.message);
  });

  test('should throw not found lab when deleting not existing lab', async () => {
    const response = (await request(app.getHttpServer())
      .delete('/labs/1')
      .send(mockActiveLab)
      .expect(500)).body;

    expect(response.message).toEqual(LAB_NOT_FOUND_ERROR.message);
  });
});
