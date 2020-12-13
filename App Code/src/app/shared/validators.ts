import { FormGroup, FormArray } from '@angular/forms';

export class Validator {
  passwordValidator(group: FormGroup): { [s: string]: boolean } {
    if (group.value.password !== group.value.confirm_password) {
      return { invalidPassword: true };
    }
    return null;
  }

  subjectValidator(formArray: FormArray): { [s: string]: boolean } {
    for (let x = 0; x < formArray.length; ++x) {
      if (formArray.at(x).value) {
        return null;
      }
    }
    return { invalidSubjects: true };
  }
}
