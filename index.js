// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
    constructor(name) {
        this.id = ++neighborhoodId;
        this.name = name;
        store.neighborhoods.push(this);
    }
    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.neighborhoodId === this.id;
        })
    }
    customers() {
        let allCustomers = this.deliveries().map(d => {
            return d.customer()
        })
        return Array.from(new Set(allCustomers))
    }
    meals() {
        return this.deliveries().map(d => {return d.meal()}).filter(function(meal, index, array) {
            return array.indexOf(meal) === index;
        })
    }
}

class Meal {
    constructor(title, price) {
        this.id = ++mealId;
        this.title = title;
        this.price = price;
        store.meals.push(this);
    }
    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.mealId === this.id;
        })
    }
    customers() {
        return this.deliveries().map(d => {
            return d.customer()
        })
    }

    static byPrice() {
        return store.meals.sort(function(a, b) {
            return b.price - a.price;
        })
    }
}

class Customer {
    constructor(name, neighborhoodId) {
        this.id = ++customerId;
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        store.customers.push(this);
    }
    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id
        })
    }
    meals() {
        return this.deliveries().map(d => {
            return d.meal();
        })
    }
    totalSpent() {
        return this.meals().map(meal => meal.price).reduce((acc, curr) => {return acc+curr})
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++deliveryId;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        store.deliveries.push(this);
    }
    customer() {
        return store.customers.find(customer => {
            return customer.id === this.customerId
        })
    }
    meal() {
        return store.meals.find(meal => {
            return meal.id === this.mealId
        })
    }
    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id === this.neighborhoodId
        })
    }

}

