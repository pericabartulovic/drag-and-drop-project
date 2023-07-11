//This class is not part of the project but a simple exercise for class-transformer library!

//CLASS VALIDATOR
import { IsNotEmpty, IsNumber,IsPositive } from 'class-validator';

export class Product {
    @IsNotEmpty()
    title: string;
    @IsNumber()
    @IsPositive()
    price: number;
    
    constructor (t: string, p: number) {
        this.title = t;
        this.price = p;
    }
    
    getInformation() {
        return [this.title, `${this.price}€`];
    }
}