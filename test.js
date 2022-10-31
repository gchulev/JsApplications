
function testingStuff(){

    let test = ['some', 'random', 'text', 'random', 'random', 'word', 'random'];
    
    for (let i = 0; i < test.length; i++) {
        if(test[i] === 'random'){
            test.splice(i, 1);
            i--;
        }
    }
    
    console.log(test);
}

testingStuff();