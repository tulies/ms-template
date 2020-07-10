
import {observable, action} from 'mobx';
 
class TestStore {
    @observable name; 
    @observable age;
 
    @action 
    changeAge = i => {
        this.age = this.age + Number(i)
    }
 
    constructor() {
        this.name = '浮云先生'
        this.age = 25
    }
}
const test = new TestStore() 
export default test