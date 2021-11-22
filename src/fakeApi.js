export function fetchProfileData() {
    let userPromise = fetchUser();
    let postsPromise = fetchPosts();
    return {
      user: wrapPromise(userPromise),
      posts: wrapPromise(postsPromise)
    };
  }
  
  // Suspense integrations like Relay implement
  // a contract like this to integrate with React.
  // Real implementations can be significantly more complex.
  // Don't copy-paste this into your project!
  function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
      r => {
        status = "success";
        result = r;
      },
      e => {
        status = "error";
        result = e;
      }
    );
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      }
    };
  }
  
  function fetchUser() {
    console.log("fetch user...");
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("fetched user");
        resolve({
          name: "Ringo Starr"
        });
      }, 1000);
    });
  }
  
  let ringoPosts = [
    {
      id: 0,
      text:
        "I get by with a little help from my friends"
    },
    {
      id: 1,
      text:
        "I'd like to be under the sea in an octupus's garden"
    },
    {
      id: 2,
      text: "You got that sand all over your feet"
    }
  ];
  
  // Simulate new posts being added over time
  let i = 3;
  setInterval(() => {
    ringoPosts = [
      {
        id: i++,
        text: "My new post #" + i
      },
      ...ringoPosts
    ];
  }, 3000);
  
  function fetchPosts() {
    let ringoPostsAtTheTime = ringoPosts;
    console.log("fetch posts...");
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("fetched posts");
        resolve(ringoPostsAtTheTime);
      }, 2000);
    });
  }
  










///////////////////////////

// export function fetchProfileData() {
//     let userPromise = fetchUser();
//     let postsPromise = fetchPosts();
//     let triviaPromise = fetchTrivia();
//     return {
//       user: wrapPromise(userPromise),
//       posts: wrapPromise(postsPromise),
//       trivia: wrapPromise(triviaPromise)
//     };
//   }
  
//   // Suspense integrations like Relay implement
//   // a contract like this to integrate with React.
//   // Real implementations can be significantly more complex.
//   // Don't copy-paste this into your project!
//   function wrapPromise(promise) {
//     let status = "pending";
//     let result;
//     let suspender = promise.then(
//       r => {
//         status = "success";
//         result = r;
//       },
//       e => {
//         status = "error";
//         result = e;
//       }
//     );
//     return {
//       read() {
//         if (status === "pending") {
//           throw suspender;
//         } else if (status === "error") {
//           throw result;
//         } else if (status === "success") {
//           return result;
//         }
//       }
//     };
//   }
  
//   function fetchUser() {
//     console.log("fetch user...");
//     return new Promise(resolve => {
//       setTimeout(() => {
//         console.log("fetched user");
//         resolve({
//           name: "Ringo Starr"
//         });
//       }, 500);
//     });
//   }
  
//   let ringoPosts = [
//     {
//       id: 0,
//       text:
//         "I get by with a little help from my friends"
//     },
//     {
//       id: 1,
//       text:
//         "I'd like to be under the sea in an octupus's garden"
//     },
//     {
//       id: 2,
//       text: "You got that sand all over your feet"
//     }
//   ];
  
//   function fetchPosts() {
//     let ringoPostsAtTheTime = ringoPosts;
//     console.log("fetch posts...");
//     return new Promise(resolve => {
//       setTimeout(() => {
//         console.log("fetched posts");
//         resolve(ringoPostsAtTheTime);
//       }, 3000 * Math.random());
//     });
//   }
  
//   function fetchTrivia() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve([
//           {
//             id: 1,
//             text:
//               'The nickname "Ringo" came from his habit of wearing numerous rings.'
//           },
//           {
//             id: 2,
//             text:
//               "Plays the drums left-handed with a right-handed drum set."
//           },
//           {
//             id: 3,
//             text:
//               "Nominated for one Daytime Emmy Award, but did not win"
//           }
//         ]);
//       }, 3000 * Math.random());
//     });
//   }
  