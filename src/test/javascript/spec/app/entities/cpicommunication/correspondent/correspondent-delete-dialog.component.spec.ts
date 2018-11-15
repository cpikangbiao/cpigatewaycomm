/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CpigatewaycommTestModule } from '../../../../test.module';
import { CorrespondentDeleteDialogComponent } from 'app/cpi/correspondent/correspondent-delete-dialog.component';
import { CorrespondentService } from 'app/cpi/correspondent/correspondent.service';

describe('Component Tests', () => {
    describe('Correspondent Management Delete Component', () => {
        let comp: CorrespondentDeleteDialogComponent;
        let fixture: ComponentFixture<CorrespondentDeleteDialogComponent>;
        let service: CorrespondentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CpigatewaycommTestModule],
                declarations: [CorrespondentDeleteDialogComponent]
            })
                .overrideTemplate(CorrespondentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CorrespondentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CorrespondentService);
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
