/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CpigatewaycommTestModule } from '../../../../test.module';
import { CorrespondentUpdateComponent } from 'app/entities/cpicommunication/correspondent/correspondent-update.component';
import { CorrespondentService } from 'app/entities/cpicommunication/correspondent/correspondent.service';
import { Correspondent } from 'app/shared/model/cpicommunication/correspondent.model';

describe('Component Tests', () => {
    describe('Correspondent Management Update Component', () => {
        let comp: CorrespondentUpdateComponent;
        let fixture: ComponentFixture<CorrespondentUpdateComponent>;
        let service: CorrespondentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CpigatewaycommTestModule],
                declarations: [CorrespondentUpdateComponent]
            })
                .overrideTemplate(CorrespondentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CorrespondentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CorrespondentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Correspondent(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.correspondent = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Correspondent();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.correspondent = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
