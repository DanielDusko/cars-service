import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Car} from '../models/car';
import {TotalCostComponent} from '../total-cost/total-cost.component';
import {CarsService} from '../cars.service';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {CostSharedService} from '../cost-shared.service';
import {CarTableRowComponent} from '../car-table-row/car-table-row.component';
import {csValidators} from '../../shared-module/validators/cs-validators';
import {CanComponentDeactivate} from '../../guards/form-can-deactivate.guard';

@Component({
  selector: 'cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CarsListComponent implements OnInit, AfterViewInit, CanComponentDeactivate {
  @ViewChild("totalCostRef") totalCostRef: TotalCostComponent;
  @ViewChildren(CarTableRowComponent) carRows: QueryList<CarTableRowComponent>;
  totalCost: number;
  grossCost: number;
  noCarsInfo;

  cars: Car[];

  carForm: FormGroup;

  constructor(private carsService: CarsService,
              private formBuilder: FormBuilder,
              private costSharedService: CostSharedService,
              private router: Router) { }

  canDeactivate() {
    if(!this.carForm.dirty) {
      return true;
    }
    return window.confirm('Discard changes?');
  }
  ngOnInit() {
    this.loadCars();
    this.carForm = this.buildCarForm();
  }

  buildCarForm() {
    return this.formBuilder.group({
      model: ['', Validators.required],
      type: '',
      plate: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
      deliveryDate: '',
      deadline: '',
      color: '',
      power: ['', [csValidators.power]],
      clientFirstName: '',
      clientSurname: '',
      isFullyDamaged: '',
      year: '',
      parts: this.formBuilder.array([])
    });
  }

  buildParts(): FormGroup {
    return this.formBuilder.group({
      name: '',
      inStock: true,
      price: ''
    });
  }

  get parts(): FormArray {
    return <FormArray>this.carForm.get('parts');
  }

  addPart(): void {
    this.parts.push(this.buildParts());
  }

  removePart(i: number): void {
    this.parts.removeAt(i);
  }

  togglePlateValidity() {
    const demageControl = this.carForm.get('isFullyDamaged'); //referencje do obu kontrolek
    const plateControl = this.carForm.get('plate');

    if (demageControl.value) {
      plateControl.clearValidators();
    } else {
      plateControl.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(7)]);
    }
    //przekalkulowanie stan walidacji
    plateControl.updateValueAndValidity();
  }

  //dostęp do zagnieżdżonych komponentów
  ngAfterViewInit() {
    // wszystko jest po utworzeniu już componentów
    // this.totalCostRef.showGross();
    this.carRows.changes.subscribe(() => {
      if (this.carRows.last.car.clientSurname === 'Kowalski') {
        console.warn('Client Kowalski is next in queue, better go to holidays');
      }
    })
  }

  onRemovedCar(car: Car) {
    this.carsService.removeCar(car.id).subscribe(() => {
      this.loadCars();
    });
  }

  addCar() {
    // const carFormData = Object.assign({}, this.carForm.value);
    // carFormData.parts = [carFormData.parts];
    let carFormData = Object.assign({}, this.carForm.value);
    carFormData.cost = this.getPartsCost(carFormData.parts);
    this.carsService.addCar(carFormData).subscribe(() => {
      this.loadCars();
    });
  }

  getPartsCost(parts) {
    return parts.reduce((prev, nextPart) => {
      return parseFloat(prev) + parseFloat(nextPart.price);
    }, 0)
  }

  loadCars(): void {
    this.carsService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.countTotalCost();
      this.costSharedService.sharedCost(this.totalCost);
    });
  }

  showGross(): void {
    this.totalCostRef.showGross();
  }

  countTotalCost(): void {
    if (this.cars.length === 0) {
      this.totalCost = 0;
    } else {
      this.totalCost = this.cars
        .map((car) => car.cost)
        .reduce((prev, next) => prev + next);
    }
  }

  onShownGross(grossCost: number): void {
    this.grossCost = grossCost;
  }

  goToCarDetails(car: Car) {
    this.router.navigate(['/cars', car.id]);
  }

}
