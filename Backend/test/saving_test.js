const assert = require('assert');
const test = require('../models/testingschema');

describe('Saving records',function(){


    it('Sving',function(done){
        this.timeout(10000)
        let test1 = new test({
            name:"Channe"
        });
        test1.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Succesfully updated Todo");
                done();
            }
        });
    });

});