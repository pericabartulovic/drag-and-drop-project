import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

import _ from "lodash";
//using "declare" as a "Last Resort"
declare var GLOBAL: any;
//class-transformer library -> https://github.com/typestack/class-transformer
import { Product } from "./models/product.model";
import "reflect-metadata";
import { plainToInstance } from "class-transformer";
//class-validator library -> https://github.com/typestack/class-validator
import { validate } from "class-validator";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");

//TEST LODASH
console.log(_.shuffle([1, 2, 3]));

//TEST GLOBAL VARIABLE - see html file and script tag on the bottom
console.log(GLOBAL);

//CLASS-TRANSFORMER
const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 5.75 },
];

const loadedProducts = plainToInstance(Product, products);
for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

// CLASS VALIDATOR
const newProd = new Product("", -5.75);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS");
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});
