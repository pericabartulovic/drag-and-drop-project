import Cmp from './base-component.js'; //when used default export we can import it under whatever name we like
import * as Validation from "../util/validation.js";
import { projectState } from '../state/project-state.js';
import { autobind as Autobind} from '../decorators/autobind.js';

//ProjectInput Class
  export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInputElement = <HTMLInputElement>this.element.querySelector("#title");
      this.descriptionInputElement = <HTMLInputElement>this.element.querySelector("#description");
      this.peopleInputElement = <HTMLInputElement>this.element.querySelector("#people");

      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    private getUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validation.Validatable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidatable: Validation.Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const peopleValidatable: Validation.Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 25,
      };

      if (
        !Validation.validate(titleValidatable) ||
        !Validation.validate(descriptionValidatable) ||
        !Validation.validate(peopleValidatable)
      ) {
        alert("Invalid input, please try again!");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    @Autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.getUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }
  }
