import { NgModule } from "@angular/core";
import { Dashboard1 } from './dashboard1.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {path:'',component:Dashboard1} 
 ]
@NgModule({
    declarations:[Dashboard1],
    imports:[RouterModule.forChild(routes)]
})

export class Dashboard1Module {

}
// http://localhost:4100/dashboard/1/super-visor