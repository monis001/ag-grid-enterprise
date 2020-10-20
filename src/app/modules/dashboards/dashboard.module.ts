import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from './dashbard.component';

const routes: Routes = [
   {path:':id',component:Dashboard,children:[
       {path:'',redirectTo:'supervisor'},
       {path:'super-visor',loadChildren:()=>import('../dashboard1/dashboard1.module').then(m=>m.Dashboard1Module)}
   ]} 
]
@NgModule({
    declarations:[Dashboard],
    imports:[RouterModule.forChild(routes)],
    
})
export class DashBoardModule {

}