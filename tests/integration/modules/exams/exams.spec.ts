import { TestService } from 'tests/integration/config/test.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import ExamsEntity from '@src/business/exams/exams.entity';
import { ExamsType } from '@src/business/exams/exams.enum';
import { Status } from '@src/common/enums/Status';
import { EXAM_NOT_FOUND_ERROR } from '@src/business/exams/exams.error';
import { getTestModule } from '../../config/getTestModule';
import { mockActiveExam, mockNotActiveExam, mockActiveExam2 } from './mock';

describe('Exams Tests', () => {
  let app: INestApplication;
  let testService: TestService;

  beforeEach(async () => {
    ({ app, testService } = await getTestModule());

    await testService.cleanAll();
  });
  afterEach(async () => testService.closeDbConnection());

  test(`
    1: should create an active exam with success
    2: should check if exam is returned when getting active exams and check values
  `, async () => {
    /* 1 */
    await request(app.getHttpServer())
      .post('/exams')
      .send(mockActiveExam)
      .expect(201);

    /* 2 */
    const activeExams: ExamsEntity[] = (await request(app.getHttpServer())
      .get('/exams')
      .expect(200)).body;

    expect(activeExams.length).toBeGreaterThan(0);

    expect(activeExams[0].name).toEqual('Exame #1');
    expect(activeExams[0].type).toEqual(ExamsType.ANALISE_CLINICA);
    expect(activeExams[0].status).toEqual(Status.ATIVO);
  });

  test(`
    1: should create an not active exam with success
    2: should check if zero exams are returned when getting active exams
  `, async () => {
    /* 1 */
    await request(app.getHttpServer())
      .post('/exams')
      .send(mockNotActiveExam)
      .expect(201);

    /* 2 */
    const activeExams: ExamsEntity[] = (await request(app.getHttpServer())
      .get('/exams')
      .expect(200)).body;

    expect(activeExams.length).not.toBeGreaterThan(0);
  });

  test(`
    1: should create exams in batch with success
    2: should check if the exams are returned when getting active exams
  `, async () => {
    /* 1 */
    await request(app.getHttpServer())
      .post('/exams/batch')
      .send([mockActiveExam, mockActiveExam2])
      .expect(201);

    /* 2 */
    const activeExams: ExamsEntity[] = (await request(app.getHttpServer())
      .get('/exams')
      .expect(200)).body;

    expect(activeExams.length).toBeGreaterThan(0);

    expect(activeExams[0].name).toEqual('Exame #1');
    expect(activeExams[0].type).toEqual(ExamsType.ANALISE_CLINICA);
    expect(activeExams[0].status).toEqual(Status.ATIVO);

    expect(activeExams[1].name).toEqual('Exame #2');
    expect(activeExams[1].type).toEqual(ExamsType.IMAGEM);
    expect(activeExams[1].status).toEqual(Status.ATIVO);
  });

  test(`
    1: should create an active exam with success
    2: should deactivate exam with success
    3: should check if exam is not returned when getting active exams
  `, async () => {
    /* 1 */
    const activeExam = (await request(app.getHttpServer())
      .post('/exams')
      .send(mockActiveExam)
      .expect(201)).body;

    /* 2 */
    await request(app.getHttpServer())
      .delete(`/exams/${activeExam.id}`)
      .send(mockActiveExam)
      .expect(200);

    /* 3 */
    const activeExams: ExamsEntity[] = (await request(app.getHttpServer())
      .get('/exams')
      .expect(200)).body;

    expect(activeExams.length).not.toBeGreaterThan(0);
  });

  test(`
    1: should create an active exam with success
    2: should update exam with success
    2: should check if exam is returned when getting active exams and check values
  `, async () => {
    /* 1 */
    const activeExam = (await request(app.getHttpServer())
      .post('/exams')
      .send(mockActiveExam)
      .expect(201)).body;

    /* 2 */
    await request(app.getHttpServer())
      .put(`/exams/${activeExam.id}`)
      .send(mockActiveExam2)
      .expect(200);

    /* 3 */
    const activeExams: ExamsEntity[] = (await request(app.getHttpServer())
      .get('/exams')
      .expect(200)).body;

    expect(activeExams.length).toBeGreaterThan(0);

    expect(activeExams[0].name).toEqual('Exame #2');
    expect(activeExams[0].type).toEqual(ExamsType.IMAGEM);
    expect(activeExams[0].status).toEqual(Status.ATIVO);
  });

  test('should throw not found exam error when updating not existing exam', async () => {
    const response = (await request(app.getHttpServer())
      .put('/exams/1')
      .send(mockActiveExam2)
      .expect(500)).body;

    expect(response.message).toEqual(EXAM_NOT_FOUND_ERROR.message);
  });

  test('should throw not found exam when deleting not existing exam', async () => {
    const response = (await request(app.getHttpServer())
      .delete('/exams/1')
      .send(mockActiveExam2)
      .expect(500)).body;

    expect(response.message).toEqual(EXAM_NOT_FOUND_ERROR.message);
  });
});
