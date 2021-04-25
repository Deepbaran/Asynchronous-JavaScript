/*************************************************************************************
 * Asynchronous JavaScript
 * ***********************************************************************************/
/*
console.log(1);
console.log(2);

setTimeout(() => {
  // wait for 2 seconds then add the callback function at the bottom and execute it
  console.log('callback function fired');
}, 2000); // 2000 miliseconds / 2 seconds

console.log(3);
console.log(4);
*/

/*************************************************************************************
 * HTTP Request
 * ***********************************************************************************/
/*
const getTodos = (resource, callback) => {
  // This function is asynchronous
  const request = new XMLHttpRequest(); // old method. Before only XML data could be handled. But now all kind of responses can be handled

  request.addEventListener('readystatechange', () => {
    // console.log(request, request.readyState); // log everytime the request object's state is changed
    // For more about readyState refer to: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState'
    if (request.readyState === 4 && request.status !== 404) {
      // At readyState the request is complete
      // status 404 means that the API endpoint does not exists
      // For more about http status refer to: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status'
      // console.log(request.responseText); // Array of JSON data is received
      callback(null, JSON.parse(request.responseText)); // JSON.parse() converts JSON string to JS objects
    } else if (request.readyState === 4) {
      // console.log('could not fetch the data');
      callback('could not fetch the data');
    }
  });

  // request.open('GET', 'https://jsonplaceholder.typicode.com/todos/'); // Setting up the request to GET a list of todos from the API endpoint
  // request.open('GET', './todos.json');
  request.open('GET', resource);
  request.send(); // send the request
};
*/
// console.log(1);
// console.log(2);
/*
getTodos('./todos/luigi.json', (err, data) => {
  // console.log('callback fired');
  const msg = err ? err : data;
  console.log(msg);
  getTodos('./todos/mario.json', (err, data) => {
    // console.log('callback fired');
    const msg = err ? err : data;
    console.log(msg);
    getTodos('./todos/shaun.json', (err, data) => {
      // console.log('callback fired');
      const msg = err ? err : data;
      console.log(msg);
    });
  });
});
*/
/*
In the above code, first we get data from luigi.json, then we call the callback function to get the data from mario.json and then we are calling another callback function to get data from shaun.json. This chain of calling callback functions inside other callback functions is called CALLBACK HELL.

A good solution to Callback Hell is using Promises.
*/

// console.log(3);
// console.log(4);

/*************************************************************************************
 * Promises
 * ***********************************************************************************/

// promise example
/*
const getSomething = () => {
  return new Promise((resolve, reject) => {
    // fetch something
    // resolve('some data');
    reject('some error');
  });
};

getSomething().then(
  res => {
    // fire if promise is resolved
    console.log(res); // some data
  },
  err => {
    // fire if promise is rejected
    console.log(err); // some error
  }
);

// better way to write it.
getSomething()
  .then(res => console.log(res)) // fired if the promise is resolved
  .catch(err => console.log(err)); // fired if the promise is rejected
*/

/*
const getTodos = resource => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status !== 404) {
        resolve(JSON.parse(request.responseText));
      } else if (request.readyState === 4) {
        reject('error getting resource');
      }
    });
    request.open('GET', resource);
    request.send();
  });
};

// Chaining Promises
getTodos('./todos/luigi.json')
  .then(res => {
    console.log('promise 1 resolved: ', res);
    return getTodos('./todos/mario.json');
    // This return means that now, the whole getTodos().then() is equal to the return value
    // If the it is returned then, getTodos('./todos/luigi.json').then(...) -> getTodos('./todos/mario.json')
    // So, basically the next then() is attached to the returned getTodos('./todos/mario.json')
    // So, after the return: getTodos('./todos/luigi.json').then(...).then(...) -> getTodos('./todos/mario.json').then(...)
  })
  .then(res => {
    console.log('promise 2 resolved: ', res);
    return getTodos('./todos/shaun.json');
  })
  .then(res => {
    console.log('promise 3 resolved: ', res);
  })
  .catch(err => {
    console.log('promise rejected:', err); // It catches any error in any promise
  });
*/

/*************************************************************************************
 * FETCH API
 * ***********************************************************************************/
/*
fetch('./todos/luigi.json') // This if resolved returns a promise as response
  .then(res => {
    // console.log('resolved: ', res); // This is the promise that fetch returns if the it is resolved
    return res.json(); // This returns the data in the JS object form if resolved.
  })
  .then(data => {
    // res is the actual data in the JS object form that is in the API endpoint as JSON
    console.log(data); // Actual data in the API endpoint
  })
  .catch(err => console.log('rejected: ', err));
*/

/*************************************************************************************
 * Async & Await
 * ***********************************************************************************/

/*
// Asynchronous function (the async keyword makes the function asynchronous)
const getTodos = async () => {
  // It will return a promise regardless of what is inside or even if it is empty
  const res = await fetch('./todos/luigi.json'); // This returns a promise. So, res is a Promise
  const data = await res.json(); // This returns the data. So, data is the JS object holding the data
  console.log(data);

  // fetch returns Promise as response and that response.json() returns the data
};

getTodos();
*/

/*
// promise chaining in async & await
const getTodos = async () => {
  const res1 = await fetch('./todos/luigi.json');
  const data1 = await res1.json();
  console.log(data1);

  const res2 = await fetch('./todos/mario.json');
  const data2 = await res2.json();
  console.log(data2);

  const res3 = await fetch('./todos/shaun.json');
  const data3 = await res3.json();
  console.log(data3);
};

getTodos();
*/

const getTodos = async () => {
  const res = await fetch('./todos/luigis.json');
  // Promise only rejects and throws error by default in case of a network error. In other cases it returns a resolve.
  // For any other error cases, we need to throw our own error
  // If the status of the promise is not 200, then some error has occured.
  // In this case we need to throw our own custom error.
  // When we throw an error, the promise returned by the async function is rejected and catch() catches it.
  // We can also use our own custom error message when throwing our own error. It will be saved in the message property of the thrown error object.

  if (res.status !== 200) {
    throw new Error('cannot fetch the data'); // Throwing our own custom error
  }

  const data = await res.json();

  return data;
};

console.log(1);
console.log(2);

// getTodos() is a promise. So to make it non-blockig, we need to use then. This is the only time in aync & away that we need to use .then()
getTodos()
  .then(data => console.log('resolved:', data))
  .catch(err => console.log('rejected:', err.message)); // err.message gives the message in the error response created due to rejection of the promise

console.log(3);
console.log(4);

/*
ADVANTAGES OF ASYNC & AWAIT:
1. async has bundled up all of our asynchronous code in one asynchronous function.
2. async function is not going to block the rest of our code.
3. It gives us the much easier and cleaner way to chain promises together, which makes it much more readable. We can have as many promises together as we want.

DISADVANTAGES OF ASYNC & AWAIT:
1. async & await is not supported in much older browser, such as Internet Explorer. (Modern browsers do support it)
*/

/*
async functions returns promise
fetch returns promise as response(res)
res.json() returns data
*/

/*
In a sense, await is blocking the code. But, as it is in a asynchronous function, so it's overall non-blocking.
*/
