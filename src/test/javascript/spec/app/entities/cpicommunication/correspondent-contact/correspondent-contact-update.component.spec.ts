/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CpigatewaycommTestModule } from '../../../../test.module';
import { CorrespondentContactUpdateComponent } from 'app/entities/cpicommunication/correspondent-contact/correspondent-contact-update.component';
import { CorrespondentContactService } from 'app/entities/cpicommunication/correspondent-contact/correspondent-contact.service';
import { CorrespondentContact } from 'app/shared/model/cpicommunication/correspondent-contact.model';

describe('Component Tests', () => {
    describe('CorrespondentContact Management Update Component', () => {
        let comp: CorrespondentContactUpdateComponent;
        let fixture: ComponentFixture<CorrespondentContactUpdateComponent>;
        let service: CorrespondentContactService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CpigatewaycommTestModule],
                declarations: [CorrespondentContactUpdateComponent]
            })
                .overrideTemplate(CorrespondentContactUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CorrespondentContactUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CorrespondentContactService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CorrespondentContact(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.correspondentContact = entity;
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
                    const entity = new CorrespondentContact();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.correspondentContact = entity;
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
