import React, {
    useState,
    useTransition,
    Suspense
  } from "react";
  import ReactDOM from "react-dom";
  
  import "./styles.css";
  import { fetchProfileData } from "./fakeApi";
  
  function getNextId(id) {
    return id === 3 ? 0 : id + 1;
  }
  
  const initialResource = fetchProfileData(0);
  
  function App() {
    const [resource, setResource] = useState(
      initialResource
    );
    const [,
      startTransition
    ] = useTransition({
      timeoutMs: 3000
    });
    return (
      <>
        <button
          onClick={() => {
            startTransition(() => {
              const nextUserId = getNextId(
                resource.userId
              );
              setResource(
                fetchProfileData(nextUserId)
              );
            });
          }}
        >
          Next
        </button>
        <ProfilePage resource={resource} />
      </>
    );
  }
  
  function ProfilePage({ resource }) {
    return (
      <Suspense
        fallback={<h1>Loading profile...</h1>}
      >
        <ProfileDetails resource={resource} />
        <Suspense
          fallback={<h1>Loading posts...</h1>}
        >
          <ProfileTimeline resource={resource} />
        </Suspense>
      </Suspense>
    );
  }
  
  function ProfileDetails({ resource }) {
    const user = resource.user.read();
    return <h1>{user.name}</h1>;
  }
  
  function ProfileTimeline({ resource }) {
    const posts = resource.posts.read();
    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    );
  }
  
  const rootElement = document.getElementById(
    "root"
  );
  ReactDOM.createRoot(rootElement).render(<App />);
  



///////////////////////////////

//   import React, {
//     Suspense,
//     useState,
//     useTransition
//   } from "react";
//   import ReactDOM from "react-dom";
  
//   import "./styles.css";
//   import { fetchProfileData } from "./fakeApi";
  
//   const initialResource = fetchProfileData();
  
//   function ProfilePage() {
//     const [
//         isPending,
//         startTransition
//     ] = useTransition({
//       // Wait 10 seconds before fallback
//       timeoutMs: 10000
//     });
//     const [resource, setResource] = useState(
//       initialResource
//     );
  
//     function handleRefreshClick() {
//       startTransition(() => {
//         setResource(fetchProfileData());
//       });
//     }
  
//     return (
//       <Suspense
//         fallback={<h1>Loading profile...</h1>}
//       >
//         <ProfileDetails resource={resource} />
//         <button
//           onClick={handleRefreshClick}
//           disabled={isPending}
//         >
//           {isPending ? "Refreshing..." : "Refresh"}
//         </button>
//         <Suspense
//           fallback={<h1>Loading posts...</h1>}
//         >
//           <ProfileTimeline resource={resource} />
//         </Suspense>
//       </Suspense>
//     );
//   }
  
//   function ProfileDetails({ resource }) {
//     const user = resource.user.read();
//     return <h1>{user.name}</h1>;
//   }
  
//   function ProfileTimeline({ resource }) {
//     const posts = resource.posts.read();
//     return (
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>{post.text}</li>
//         ))}
//       </ul>
//     );
//   }
  
//   const rootElement = document.getElementById(
//     "root"
//   );
//   ReactDOM.createRoot(rootElement).render(
//     <ProfilePage />
//   );
  






//////////////////////////////////////////

// import React, {
//     Suspense,
//     useState,
//     useTransition
//   } from "react";
//   import ReactDOM from "react-dom";
  
//   import "./styles.css";
//   import { fetchProfileData } from "./fakeApi";
  
//   const initialResource = fetchProfileData();
  
//   function Button({ children, onClick }) {
//     const [
//         isPending,
//       startTransition
//     ] = useTransition({
//       timeoutMs: 10000
//     });

//     function handleClick() {
//       startTransition(() => {
//         onClick();
//       });
//     }
  
//     const spinner = (
//       <span
//         className="fa fa-circle-o-notch fa-spin"
//         style={{
//           marginLeft: 4,
//           fontSize: "small",
//           visibility: isPending
//             ? "visible"
//             : "hidden"
//         }}
//       />
//     );
  
//     return (
//       <>
//         <button
//           onClick={handleClick}
//           disabled={isPending}
//         >
//           {children}
//         </button>
//         {isPending ? spinner : null}
//       </>
//     );
//   }
  
//   function ProfilePage() {
//     const [resource, setResource] = useState(
//       initialResource
//     );
  
//     function handleRefreshClick() {
//       setResource(fetchProfileData());
//     }
  
//     return (
//       <Suspense
//         fallback={<h1>Loading profile...</h1>}
//       >
//         <ProfileDetails resource={resource} />
//         <Button onClick={handleRefreshClick}>
//           Refresh
//         </Button>
//         <Suspense
//           fallback={<h1>Loading posts...</h1>}
//         >
//           <ProfileTimeline resource={resource} />
//         </Suspense>
//       </Suspense>
//     );
//   }
  
//   function ProfileDetails({ resource }) {
//     const user = resource.user.read();
//     return <h1>{user.name}</h1>;
//   }
  
//   function ProfileTimeline({ resource }) {
//     const posts = resource.posts.read();
//     return (
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>{post.text}</li>
//         ))}
//       </ul>
//     );
//   }
  
//   const rootElement = document.getElementById(
//     "root"
//   );
//   ReactDOM.createRoot(rootElement).render(
//     <ProfilePage />
//   );
  




///////////////////////

// import React, {
//     SuspenseList,
//     Suspense
//   } from "react";
//   import ReactDOM from "react-dom";
  
//   import "./styles.css";
//   import { fetchProfileData } from "./fakeApi";
  
//   const initialResource = fetchProfileData(0);
  
//   function App() {
//     return (
//       <Suspense fallback={<h1>Loading...</h1>}>
//         <ProfilePage resource={initialResource} />
//       </Suspense>
//     );
//   }
  
//   function ProfilePage({ resource }) {
//     return (
//         <SuspenseList revealOrder="forwards">
//        {/* <SuspenseList revealOrder="forwards" tail="collapsed"> */}
//         <ProfileDetails resource={resource} />
//         <Suspense
//           fallback={<h2>Loading posts...</h2>}
//         >
//           <ProfileTimeline resource={resource} />
//         </Suspense>
//         <Suspense
//           fallback={<h2>Loading fun facts...</h2>}
//         >
//           <ProfileTrivia resource={resource} />
//         </Suspense>
//       </SuspenseList>
//     );
//   }
  
//   function ProfileDetails({ resource }) {
//     const user = resource.user.read();
//     return <h1>{user.name}</h1>;
//   }
  
//   function ProfileTimeline({ resource }) {
//     const posts = resource.posts.read();
//     return (
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>{post.text}</li>
//         ))}
//       </ul>
//     );
//   }
  
//   function ProfileTrivia({ resource }) {
//     const trivia = resource.trivia.read();
//     return (
//       <>
//         <h2>Fun Facts</h2>
//         <ul>
//           {trivia.map(fact => (
//             <li key={fact.id}>{fact.text}</li>
//           ))}
//         </ul>
//       </>
//     );
//   }
  
//   const rootElement = document.getElementById(
//     "root"
//   );
//   ReactDOM.createRoot(rootElement).render(<App />);
  