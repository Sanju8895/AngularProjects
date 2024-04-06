import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{

   designationList: any [] = [];
   roleList: any[] = [];
   stepsList: any [] = [
    { stepId: 1,stepName:"Basic Details", isComplete: false },
    { stepId: 2,stepName:"Skills", isComplete: false },
    { stepId: 3,stepName:"Experience", isComplete: false },
  ]
    stepCompletionValue: number = 12;

  employeeObj: any ={
    "roleId": 0,
    "userName": " ",
    "empCode": " ",
    "empId": 0,
    "empName": " ",
    "empEmailId": " ",
    "empDesignationId": 0,
    "empContactNo": " ",
    "empAltContactNo": " ",
    "empPersonalEmailId": " ",
    "empExpTotalYear": 0,
    "empExpTotalMonth": 0,
    "empCity": " ",
    "empState": " ",
    "empPinCode": " ",
    "empAddress": " ",
    "empPerCity": " ",
    "empPerState": " ",
    "empPerPinCode": " ",
    "empPerAddress": " ",
    "password": " ",
  ErpEmployeeSkills: [],
  ErmEmpExperiences: []
  } 

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.loadDesignations();
    this.loadRoles();
  }
  activeStep: any = this.stepsList[0];

  setStepActive(activeStep: any){
    this.activeStep = activeStep;
  }

  goToStep2(){
    const currentState= this.stepsList.find(m=>m.stepName== this.activeStep.stepName);
    currentState.isComplete= true;
    this.activeStep = this.stepsList[1];
    this.stepCompletionValue= 52;
  }

  goToStep3(){
    const currentState = this.stepsList.find(m=> m.stepName == this.activeStep.stepName);
    currentState.isComplete = true;
    this.activeStep = this.stepsList[2];
    this.stepCompletionValue = 100;
  }

  addSkills(){
    const empSkillObj: any = {
      "empSkillId": 0,
      "empId": 0,
      "skill": "",
      "totalYearExp": 0,
      "lastVersionUsed": ""
    
  }
    this.employeeObj.ErpEmployeeSkills.unshift(empSkillObj);
  }

  addExperience(){
    const empExpObj: any = {
        "empExpId": 0,
        "empId": 0,
        "companyName": " ",
        "startDate": "2024-04-04T08:11:29.961Z",
        "endDate": "2024-04-04T08:11:29.961Z",
        "designation": " ",
        "projectsWorkedOn": " "
    
  }
    this.employeeObj.ErmEmpExperiences.unshift(empExpObj);
  }

  loadDesignations(){
    this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation").subscribe((res:any)=>{
      this.designationList= res.data;
    });
    
  }

  loadRoles(){
    this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllRoles").subscribe((res:any)=>{
      this.roleList= res.data;
    });
  }

saveEmployee(){
  // debugger
  this.http.post("https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee", this.employeeObj).subscribe((res:any)=>{
    if(res.result){
      alert("Employee created successfully")
    }else{
      alert(res.message)
    }
  })
}




}
