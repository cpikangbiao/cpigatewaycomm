/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CpigatewaycommTestModule } from '../../../../test.module';
import { CorrespondentContactDetailComponent } from 'app/cpi/correspondent-contact/correspondent-contact-detail.component';
import { CorrespondentContact } from 'app/shared/model/cpicommunication/correspondent-contact.model';

describe('Component Tests', () => {
    describe('CorrespondentContact Management Detail Component', () => {
        let comp: CorrespondentContactDetailComponent;
        let fixture: ComponentFixture<CorrespondentContactDetailComponent>;
        const route = ({ data: of({ correspondentContact: new CorrespondentContact(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CpigatewaycommTestModule],
                declarations: [CorrespondentContactDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CorrespondentContactDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CorrespondentContactDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.correspondentContact).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
