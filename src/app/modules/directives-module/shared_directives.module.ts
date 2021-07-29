import { NgModule } from '@angular/core';
import { TextToNumberDirective } from 'src/app/shared/directives/text-to-number.directive';

@NgModule({
  declarations:[
    TextToNumberDirective,
  ],
  exports:[
    TextToNumberDirective,
  ]
})
export class SharedDirectivesModule {

}
