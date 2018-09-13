import { TyresModule } from './tyres.module';

describe('TyresModule', () => {
  let tyresModule: TyresModule;

  beforeEach(() => {
    tyresModule = new TyresModule();
  });

  it('should create an instance', () => {
    expect(tyresModule).toBeTruthy();
  });
});
