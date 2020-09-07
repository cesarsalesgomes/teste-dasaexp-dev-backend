import { TestService } from 'tests/integration/config/test.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Status } from '@src/common/enums/Status';
import CreateExamLabInput from '@src/business/exams-labs/inputs/CreateExamLabInput';
import LabsEntity from '@src/business/labs/labs.entity';
import { States } from '@src/business/labs/labs.enum';
import { EXAM_NOT_FOUND_ERROR, EXAM_DEACTIVATED_ERROR } from '@src/business/exams/exams.error';
import { LAB_DEACTIVATED_ERROR } from '@src/business/labs/labs.error';
import { DUPLICATE_EXAM_LAB_ERROR } from '@src/business/exams-labs/exams-labs.error';
import { getTestModule } from '../../config/getTestModule';
import { mockActiveLab, mockActiveLab2, mockNotActiveLab } from '../labs/mock';
import { mockActiveExam, mockNotActiveExam } from '../exams/mock';

describe('Exams Labs Tests', () => {
  let app: INestApplication;
  let testService: TestService;

  beforeEach(async () => {
    ({ app, testService } = await getTestModule());

    await testService.cleanAll();
  });
  afterEach(async () => testService.closeDbConnection());

  test(`
    1: should create an active exam with success
    2: should create active labs with success
    3: should associate exam to labs created
    4: should search exam by name and return the labs associated to him 
  `, async () => {
    /* 1 */
    const activeExam = (await request(app.getHttpServer())
      .post('/exams')
      .send(mockActiveExam)
      .expect(201)).body;

    /* 2 */
    const activeLab = (await request(app.getHttpServer())
      .post('/labs')
      .send(mockActiveLab)
      .expect(201)).body;

    const activeLab2 = (await request(app.getHttpServer())
      .post('/labs')
      .send(mockActiveLab2)
      .expect(201)).body;

    /* 3 */
    const examLabInput: CreateExamLabInput = {
      examId: activeExam.id,
      labId: activeLab.id
    };

    const examLab2Input: CreateExamLabInput = {
      examId: activeExam.id,
      labId: activeLab2.id
    };

    await request(app.getHttpServer())
      .post('/exams-labs')
      .send(examLabInput)
      .expect(201);

    await request(app.getHttpServer())
      .post('/exams-labs')
      .send(examLab2Input)
      .expect(201);

    /* 4 */
    const labs: LabsEntity[] = (await request(app.getHttpServer())
      .get('/exams/labs')
      .query({ examName: 'Exame #1' })
      .expect(200)).body;

    expect(labs.length).toBeGreaterThan(0);

    expect(labs[0].name).toEqual('Dasa Laboratório #1');
    expect(labs[0].postcode).toEqual('04734001');
    expect(labs[0].state).toEqual(States.SP);
    expect(labs[0].city).toEqual('São Paulo');
    expect(labs[0].street).toEqual('Avenida Adolfo Pinheiro');
    expect(labs[0].number).toEqual('1823');
    expect(labs[0].neighborhood).toEqual('Santo Amaro');
    expect(labs[0].additionalInfo).toEqual('Ao lado da banca');
    expect(labs[0].status).toEqual(Status.ATIVO);

    expect(labs[1].name).toEqual('Dasa Laboratório #3');
    expect(labs[1].postcode).toEqual('37800000');
    expect(labs[1].state).toEqual(States.MG);
    expect(labs[1].city).toEqual('Guaxupé');
    expect(labs[1].street).toEqual('Rua Ivo Martins');
    expect(labs[1].number).toEqual('170');
    expect(labs[1].neighborhood).toEqual('Vila Meziara');
    expect(labs[1].additionalInfo).toEqual('Próximo ao ponto');
    expect(labs[1].status).toEqual(Status.ATIVO);
  });

  test(`
    1: should create an active exam with success
    2: should create active labs with success
    3: should associate exam to labs created
    4: should search exam by name and return the labs associated to him 
    5: should desassociate exam lab
    6: should only return one lab associated
  `, async () => {
    /* 1 */
    const activeExam = (await request(app.getHttpServer())
      .post('/exams')
      .send(mockActiveExam)
      .expect(201)).body;

    /* 2 */
    const activeLab = (await request(app.getHttpServer())
      .post('/labs')
      .send(mockActiveLab)
      .expect(201)).body;

    const activeLab2 = (await request(app.getHttpServer())
      .post('/labs')
      .send(mockActiveLab2)
      .expect(201)).body;

    /* 3 */
    const examLabInput: CreateExamLabInput = {
      examId: activeExam.id,
      labId: activeLab.id
    };

    const examLab2Input: CreateExamLabInput = {
      examId: activeExam.id,
      labId: activeLab2.id
    };

    await request(app.getHttpServer())
      .post('/exams-labs')
      .send(examLabInput)
      .expect(201);

    const examLab2 = (await request(app.getHttpServer())
      .post('/exams-labs')
      .send(examLab2Input)
      .expect(201)).body;

    /* 4 */
    let labs: LabsEntity[] = (await request(app.getHttpServer())
      .get('/exams/labs')
      .query({ examName: 'Exame #1' })
      .expect(200)).body;

    expect(labs.length).toBeGreaterThan(0);

    /* 5 */
    await request(app.getHttpServer())
      .delete(`/exams-labs/${examLab2.id}`)
      .expect(200);

    /* 6 */
    labs = (await request(app.getHttpServer())
      .get('/exams/labs')
      .query({ examName: 'Exame #1' })
      .expect(200)).body;

    expect(labs.length).toEqual(1);
  });

  test('should throw error when not founding exam by name', async () => {
    const response = (await request(app.getHttpServer())
      .get('/exams/labs')
      .query({ examName: 'Exame Inexistente' })
      .expect(500)).body;

    expect(response.message).toEqual(EXAM_NOT_FOUND_ERROR.message);
  });

  test(`
    1: should create an not active exam with success
    2: should create an active lab with success
    3: should throw error when associating an lab to an not active exam
  `, async () => {
    /* 1 */
    const activeExam = (await request(app.getHttpServer())
      .post('/exams')
      .send(mockNotActiveExam)
      .expect(201)).body;

    /* 2 */
    const activeLab = (await request(app.getHttpServer())
      .post('/labs')
      .send(mockActiveLab)
      .expect(201)).body;

    /* 3 */
    const examLabInput: CreateExamLabInput = {
      examId: activeExam.id,
      labId: activeLab.id
    };

    const response = (await request(app.getHttpServer())
      .post('/exams-labs')
      .query(examLabInput)
      .expect(500)).body;

    expect(response.message).toEqual(EXAM_DEACTIVATED_ERROR.message);
  });

  test(`
    1: should create an active exam with success
    2: should create an not active lab with success
    3: should throw error when associating an not active lab to an active exam
  `, async () => {
    /* 1 */
    const activeExam = (await request(app.getHttpServer())
      .post('/exams')
      .send(mockActiveExam)
      .expect(201)).body;

    /* 2 */
    const activeLab = (await request(app.getHttpServer())
      .post('/labs')
      .send(mockNotActiveLab)
      .expect(201)).body;

    /* 3 */
    const examLabInput: CreateExamLabInput = {
      examId: activeExam.id,
      labId: activeLab.id
    };

    const response = (await request(app.getHttpServer())
      .post('/exams-labs')
      .query(examLabInput)
      .expect(500)).body;

    expect(response.message).toEqual(LAB_DEACTIVATED_ERROR.message);
  });

  test(`
    1: should create an active exam with success
    2: should create AN active lab with success
    3: should associate exam to lab created
    4: should throw error when associating same lab to exam 
  `, async () => {
    /* 1 */
    const activeExam = (await request(app.getHttpServer())
      .post('/exams')
      .send(mockActiveExam)
      .expect(201)).body;

    /* 2 */
    const activeLab = (await request(app.getHttpServer())
      .post('/labs')
      .send(mockActiveLab)
      .expect(201)).body;

    /* 3 */
    const examLabInput: CreateExamLabInput = {
      examId: activeExam.id,
      labId: activeLab.id
    };

    await request(app.getHttpServer())
      .post('/exams-labs')
      .send(examLabInput)
      .expect(201);

    /* 4 */
    const response = (await request(app.getHttpServer())
      .post('/exams-labs')
      .send(examLabInput)
      .expect(500)).body;

    expect(response.message).toEqual(DUPLICATE_EXAM_LAB_ERROR.message);
  });
});
