/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CpigatewaycommTestModule } from '../../../../test.module';
import { CorrespondentDetailComponent } from 'app/entities/cpicommunication/correspondent/correspondent-detail.component';
import { Correspondent } from 'app/shared/model/cpicommunication/correspondent.model';

describe('Component Tests', () => {
    describe('Correspondent Management Detail Component', () => {
        let comp: CorrespondentDetailComponent;
        let fixture: ComponentFixture<CorrespondentDetailComponent>;
        const route = ({ data: of({ correspondent: new Correspondent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CpigatewaycommTestModule],
                declarations: [CorrespondentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CorrespondentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CorrespondentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.correspondent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
