// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodsId = 0;
let customersId = 0;
let mealsId = 0;
let deliveriesId = 0;


//---------------neighborhoods--------------
//     new Neighborhood() - initialized with name. It returns an object that has attributes of id and name
class Neighborhood{
    constructor(name){
        this.name = name;
        this.id = ++neighborhoodsId;
        store.neighborhoods.push(this);
    }

// deliveries() - returns a list of all deliveries placed in a neighborhood
    deliveries(){
       const deliveriesInNeighborhood = [];
       for(const delivery of store.deliveries){
           if(delivery.neighborhoodId === this.id){
               deliveriesInNeighborhood.push(delivery)
           }
       }
       return deliveriesInNeighborhood;
    }

// customers() - returns all of the customers that live in a particular neighborhood
    customers(){
      const customersInNeighborhood =[]
        for(const customer of store.customers){
            if(customer.neighborhoodId === this.id){
                customersInNeighborhood.push(customer)
            }
        }
        return customersInNeighborhood;
    }

// meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)
    meals(){
       const neighborhoodMealIds =[];
        this.deliveries().forEach(function(delivery){
            neighborhoodMealIds.push(delivery.mealId)
        });
        let uniqueNeighborhoodMealIds = [...new Set(neighborhoodMealIds)]
        return store.meals.filter(meal => uniqueNeighborhoodMealIds.includes(meal.id))
    }


}





//------------------------------------------
//---------------customers--------------
// new Customer() — should expect to be initialized with a name and a neighborhoodId. It returns an object that has attributes of id, neighborhoodId, and name.
class Customer {
    constructor(name, neighborhoodId){
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        this.id = ++customersId;
        store.customers.push(this);
    }

// deliveries() — returns all of the deliveries that customer has received
    deliveries(){
        const deliveriesForCustomer = [];
       for(const delivery of store.deliveries){
           if(delivery.customerId === this.id){
               deliveriesForCustomer.push(delivery)
           }
       }
       return deliveriesForCustomer;

    }

// meals() - returns all meals that a customer has ordered
    meals(){
        const customerMealIds =[];
       
        this.deliveries().forEach(function(delivery){
            customerMealIds.push(delivery.mealId)
        });
        return customerMealIds.map(mealID => store.meals.find(function(meal) {return mealID === meal.id} ))
    }

// totalSpent() - returns the total amount that the customer has spent on food.
    totalSpent(){
       let sum = 0;
       for(const meal of this.meals()){
          sum +=  meal.price;
       }
       return sum;

        
    }

}
//------------------------------------------
//---------------meals--------------

// MEAL CLASS:
// new Meal() — initialized with title and price. It returns an object that has attributes of title, price, and id. Meal Ids should automatically increment.
class Meal{
    constructor(title, price){
        this.title = title;
        this.price = price;
        this.id = ++mealsId;
        store.meals.push(this);
    }

// deliveries() - returns all of the deliveries associated with a particular meal.
         deliveries(){
          return  store.deliveries.filter(delivery => delivery.mealId === this.id)
        }

// customers() - returns all of the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
        customers(){
            const mealCustomerIds =[];
        this.deliveries().forEach(function(delivery){
            mealCustomerIds.push(delivery.customerId)
        });
        let uniquemealCustomerIds = [...new Set(mealCustomerIds)]
        return store.customers.filter(customer => uniquemealCustomerIds.includes(customer.id))
        }

// byPrice() - A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.
        static byPrice(){
            return store.meals.sort((a, b) => b.price - a.price)
        }

}



//------------------------------------------
//---------------deliveriers--------------

// DELIVERY CLASS:
// new Delivery() — initialized with mealId, neighborhoodId, and customerId. It returns an object that has attributes of mealId, neighborhoodId, customerId, and id
class Delivery{
    constructor(mealId, neighborhoodId, customerId){
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        this.id = ++deliveriesId;
        store.deliveries.push(this);
    }

// meal() - returns the meal associated with a particular delivery
    meal(){
        return store.meals.find(meal => meal.id === this.mealId);
    }

// customer() - returns the customer associated with a particular delivery
    customer(){
        return store.customers.find(customer => customer.id === this.customerId);
    }

// neighborhood() - returns the neighborhood associated with a particular delivery
    neighborhood(){
        return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
    }

}


















//------------------------------------------