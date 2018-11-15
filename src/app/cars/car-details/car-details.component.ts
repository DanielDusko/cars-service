import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CarsService} from '../cars.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Car} from '../models/car';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CanComponentDeactivate} from '../../guards/form-can-deactivate.guard';
import {DateInfoComponent} from './date-info/date-info.component';

@Component({
  selector: 'cs-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.less']
})
export class CarDetailsComponent implements OnInit, CanComponentDeactivate {
  @ViewChild('dateInfoContainer', {read: ViewContainerRef}) dateInfoContainer: ViewContainerRef;
  car: Car;
  carForm: FormGroup;
  removeOrAddPart: boolean = false;
  saveForm: boolean = false;
  elapsedDays: number;
  dateInfoRef;

  constructor(private carsService: CarsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver, //magaxyn dynamicznych komponentów
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCar();
    this.carForm = this.buildCarForm();
  }

  createDateInfo() {
    // const dateInfoFactory = this.componentFactoryResolver.resolveComponentFactory(<Type<DateInfoComponent>>DateInfoComponent);
    if (this.dateInfoContainer.get(0) !== null) {
      return;
    }
    const dateInfoFactory = this.componentFactoryResolver.resolveComponentFactory(DateInfoComponent);

    this.dateInfoRef = <ComponentRef<DateInfoComponent>>this.dateInfoContainer.createComponent(dateInfoFactory);
    this.dateInfoRef.instance.car = this.car;
    this.dateInfoRef.instance.checkElapsedDays.subscribe((value) => {
      this.elapsedDays = value;
    });
  }

  clearDateInfoContainer() {
    // !!!!!1 SPOSÓB
    // this.dateInfoContainer.clear();
    // !!!!!!2 SPOSÓB
    // this.dateInfoContainer.remove(0);
    // !!!!!!3 SPOSÓB
    this.dateInfoRef.destroy(0);


  }

  canDeactivate() {
    if (this.saveForm) {
      return true;
    }
    if(!this.carForm.dirty && !this.removeOrAddPart) {
      return true;
    }
    return window.confirm('Discard changes?');
  }

  buildCarForm() {
    let parts = this.car.parts.map((part) => {
      return this.formBuilder.group(part);
    });
    return this.formBuilder.group({
      model: [this.car.model, Validators.required],
      type: this.car.type,
      plate: [this.car.plate, [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
      deliveryDate: this.car.deliveryDate,
      deadline: this.car.deadline,
      color: this.car.color,
      power: this.car.power,
      clientFirstName: this.car.clientFirstName,
      clientSurname: this.car.clientSurname,
      isFullyDamaged: this.car.isFullyDamaged,
      year: this.car.year,
      parts: this.formBuilder.array(parts)
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
    this.removeOrAddPart = true;
  }

  removePart(i: number): void {
    this.parts.removeAt(i);
    this.removeOrAddPart = true;
  }

  // + plus przerabia na liczbę
  loadCar() {
    this.car = this.route.snapshot.data['car'];
    // const id = +this.route.snapshot.params['id'];
    //
    // this.carsService.getCar(id).subscribe((car) => {
    //   this.car = car;
    // }); j
  }

  updateCar() {
    this.saveForm = true;
    let carFormData = Object.assign({}, this.carForm.value);
    carFormData.cost = this.getPartsCost(carFormData.parts);

    this.carsService.updateCar(this.car.id, carFormData).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }

  getPartsCost(parts) {
    return parts.reduce((prev, nextPart) => {
      return parseFloat(prev) + parseFloat(nextPart.price);
    }, 0)
  }

}
