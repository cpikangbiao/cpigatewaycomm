/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CpigatewaycommTestModule } from '../../../../test.module';
import { PortDeleteDialogComponent } from 'app/cpi/port/port-delete-dialog.component';
import { PortService } from 'app/cpi/port/port.service';

describe('Component Tests', () => {
    describe('Port Management Delete Component', () => {
        let comp: PortDeleteDialogComponent;
        let fixture: ComponentFixture<PortDeleteDialogComponent>;
        let service: PortService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CpigatewaycommTestModule],
                declarations: [PortDeleteDialogComponent]
            })
                .overrideTemplate(PortDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PortDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PortService);
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
