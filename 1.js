// code
let A = 4550
let B = 5330
let C = 8653

// function price 
function price(code, qty) {
    // item A
    if(code === A && qty > 13){
        item = (qty * A);
        disc = (qty * 231);
        total = item - disc;
        
        console.log('Your code item is : A' );
        console.log('---------------------------');
        console.log('Item price : ' + code);
        console.log('quantity  : ' + qty);
        console.log('Total item price : ' + item);
        console.log('discount : ' + disc);
        console.log('---------------------------');
        console.log('Total to be paid : '+ total)
    } else if(code === A && qty <= 13){
        item = (qty * A);
        total = item;
        
        console.log('Your code item is : A' );
        console.log('---------------------------');
        console.log('Item price : ' + code);
        console.log('quantity  : ' + qty);
        console.log('Total item price : ' + item);
        console.log("discount : You don't get a discount");
        console.log('---------------------------');
        console.log('Total to be paid : '+ total)
    }  
    // item B
    if(code === B && qty > 7){
        item = (qty * B);
        disc = Math.round(qty * 0.23);
        total = item - disc;
        
        console.log('Your code item is : B' );
        console.log('---------------------------');
        console.log('Item price : ' + code);
        console.log('quantity  : ' + qty);
        console.log('Total item price : ' + item);
        console.log('discount : ' + disc);
        console.log('---------------------------');
        console.log('Total to be paid : '+ total)
    } else if(code === B && qty <= 7){
        item = (qty * B);
        total = item;
        
        console.log('Your code item is : B' );
        console.log('---------------------------');
        console.log('Item price : ' + code);
        console.log('quantity  : ' + qty);
        console.log('Total item price : ' + item);
        console.log("discount : You don't get a discount");
        console.log('---------------------------');
        console.log('Total to be paid : '+ total)
    }  
    // item C
    else if(code === C){
        item = (qty * C);
        total = item;
        
        console.log('Your code item is : C' );
        console.log('---------------------------');
        console.log('Item price : ' + code);
        console.log('quantity  : ' + qty);
        console.log('Total item price : ' + item);
        console.log("discount : You don't get a discount");
        console.log('---------------------------');
        console.log('Total to be paid : '+ total)
    }

}

// use function
price(A, 14)