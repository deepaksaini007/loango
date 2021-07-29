import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StoreService } from './core/services/store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Loan Go';

  constructor(
    private storeService: StoreService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.storeService.isLoading$.subscribe((val) => {
      if (val) this.spinnerService.show();
      else this.spinnerService.hide();
    });
  }
}
