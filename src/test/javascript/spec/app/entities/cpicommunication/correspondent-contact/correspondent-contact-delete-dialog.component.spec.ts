/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CpigatewaycommTestModule } from '../../../../test.module';
import { CorrespondentContactDeleteDialogComponent } from 'app/cpi/correspondent-contact/correspondent-contact-delete-dialog.component';
import { CorrespondentContactService } from 'app/cpi/correspondent-contact/correspondent-contact.service';

describe('Component Tests', () => {
    describe('CorrespondentContact Management Delete Component', () => {
        let comp: CorrespondentContactDeleteDialogComponent;
        let fixture: ComponentFixture<CorrespondentContactDeleteDialogComponent>;
        let service: CorrespondentContactService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CpigatewaycommTestModule],
                declarations: [CorrespondentContactDeleteDialogComponent]
            })
                .overrideTemplate(CorrespondentContactDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CorrespondentContactDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CorrespondentContactService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
