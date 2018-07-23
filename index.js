// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood {
    constructor(name){
        this.name = name  
        this.id = ++neighborhoodId
        store.neighborhoods.push(this)
    }
    deliveries(){
        return store.deliveries.filter((delivery)=>delivery.neighborhoodId === this.id)
    }
    customers(){
        let customers = []
        this.deliveries().forEach((delivery)=>{
            let customer = store.customers.find((customer)=>customer.id===delivery.customerId)
            if (!customers.includes(customer)) {
                customers.push(customer)
            }
        })
        return customers
    }
    meals(){
         let meals = []
         this.deliveries().forEach((delivery) => {
           let meal = store.meals.find((meal) => meal.id === delivery.mealId)
           if (!meals.includes(meal)) {
             meals.push(meal)
           }
         })
         return meals
    }
}

let mealId = 0
class Meal {
    constructor(title, price){
        this.title = title
        this.price = price
        this.id = ++mealId
        store.meals.push(this)
    }
    deliveries(){
        return store.deliveries.filter((delivery) => delivery.mealId === this.id)
    }
    customers(){
        let customers = []
        this.deliveries().forEach((delivery) => {
          let customer = store.customers.find((customer) => customer.id === delivery.customerId)
          if (!customers.includes(customer)) {
            customers.push(customer)
          }
        })
        return customers
    }
    static byPrice(){
        return [...store.meals].sort((a,b)=> b.price-a.price)
    }
}

let customerId = 0
class Customer {
    constructor(name, neighborhoodId){
        this.name = name 
        this.id = ++customerId
        this.neighborhoodId = neighborhoodId
        store.customers.push(this)
    }
    deliveries(){
        return store.deliveries.filter((delivery) => delivery.customerId === this.id)
    }
    meals(){
        return this.deliveries().map((delivery) => store.meals.find((meal) => meal.id === delivery.mealId))
    }

    totalSpent(){
        return this.meals().reduce((acc,meal)=>acc+meal.price,0)
    }
}

let deliveryId = 0
class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.mealId = mealId
        this.customerId = customerId
        this.neighborhoodId = neighborhoodId
        this.id = ++deliveryId
        store.deliveries.push(this)
    }
    meal(){
        return store.meals.find((meal)=>this.mealId===meal.id)
    }
    customer() {
      return store.customers.find((customer) => this.customerId === customer.id)
    }
    neighborhood() {
      return store.neighborhoods.find((neighborhood) => this.neighborhoodId === neighborhood.id)
    }
}
