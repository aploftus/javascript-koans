var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
    var productsICanEat = [];

    /* solve using filter() & all() / any() */
    productsICanEat = _.filter(products, function(item) {
      return item.containsNuts === false &&
        _.all(item.ingredients, function(ingredient) {
          return ingredient !== 'mushrooms';
        });
    });

    expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    /* try chaining range() and reduce() */
    var sum = _.range(1, 1001);

    return _(sum).reduce(function(acc, val) {
      if (val % 3 === 0 || val % 5 === 0) {
        return acc + val;
      }
    }, 0);

    expect(sum).toBe(233168);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    _(products).chain()
      .map(function(item) { return item.ingredients; })
      .flatten()
      .reduce(function(memo, ingredient) { ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1 });

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should solve Euler Problem 3: find the largest prime factor of a composite number", function () {
    function isPrime(num) {
      for (var x = 2; x < num; x++) {
        if (num % x === 0) {
          return false;
        }
      }
      return true;
    }
    // WILL LAG WITH EXTREMELY LARGE NUMS. PROJECT EULER REQUESTS INPUT OF 600851475143.
    function greatestPrimeFactor(composite) {
      var searchLimit = Math.ceil(composite / 2) - 1;
      for (var x = searchLimit; x >=2; x--) {
        if (composite % x === 0 && isPrime(x)) {
          return x;
        }
      }
    }
    expect(greatestPrimeFactor(13195)).toBe(29);
  });

  // it("should solve Euler Problem 4: find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  // });

  it("should solve Euler Problem 5: find the smallest number divisible by each of the numbers 1 to 20", function () {
    var factors = _.range(1, 11);
    var result;

    for (var x = 10; result === undefined; x += 10) {
      if (_.every(factors, function(factor) {
        return x % factor === 0;
      })) {
        result = x;
      }
    }
    
    expect(result).toBe(2520);
  });

  it("should solve Euler Problem 6: find the difference between the sum of the squares and the square of the sums", function () {
    function diffSumSqSqSum(limit) {
      var nums = _.range(1, limit + 1);
      var squareOfSums = Math.pow(_(nums).reduce(function(acc, val) { return acc + val }, 0), 2);
      var sumOfSquares = _(nums).chain()
                          .map(function(num) { return num ** 2 })
                          .reduce(function(acc, val) { return acc + val }, 0)
                          .value();
      return squareOfSums - sumOfSquares;
    }

    expect(diffSumSqSqSum(10)).toBe(2640);
  });

  // it("should solve Euler Problem 7: find the 10001st prime", function () {

  // });
  
});
