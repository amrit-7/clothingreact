# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



<!-- REACT REDUX CODE Boilerplate -->
<!-- We need to install the library using :-->
 ### npm install redux react-redux @reduxjs/toolkit redux-logger 
1. First Make a store folder which will contain the redux store and all other folders which includes action, reducers and other important files.
2. Inside of the store folder, make a file as store.js/redux-store.js.
3. This store.js is the combined space where we recieve actions an we dispatch them into our reducers to update the state.
4. Inside the store.js we have to start writing the code to use the store.
   <!-- Inside store.js -->
   ### => import {compose, createStore, applyMiddleware} from "redux"
   ### => import {logger} from "redux-logger"
5. In order to use the store, and store the state values, we need a root reducer, which is the main reducer which gets the value from all other reducers and then collect and send the singular response value to the components.
6. So we have to make a folder of root reducer and make a file as root-reducer.js in the folder.
    <!-- Inisde RootReducer  -->
   ### => import {combineReducers} from "redux";
   ### => export const rootReducer = combineReducers({ user: userReducer })
7. Inside this we have to pass the  name of the reducers as key value pairs;
8. Now we can make a user reducer to save the user information in our store.
9. Inside the store folder, create a folder called reducer and the make a file of user-reducer inside.
10. As we know in reducers we need some action types as the component will send the values using the action types.So along with the user reducer we will also make a action folder and inside it we will create a file called user-action-types.
    <!-- Inisde User Action Types -->
    ### => export const ACTION_TYPES={
        any action : "String value of the action"
    }
     <!--Inside User-Reducer  -->
    we have to import the user action type
    ### =>  import { USER_ACTIONS_TYPES } from "../action/action-types";
    ### => const INITIAL = { 
        currentUser: null,    
        };
    ### => export const userReducer = (state =INITIALaction) => {
    ### => const { type, payload } = action;
    ### => switch (type) {
    ### => case USER_ACTIONS_TYPES.SET_CURRENT_USER:
    ### =>   return { ...state, currentUser: payload };
    ### => default:
    ### =>   return state;}};
11. Now we can use this reducer in our root reducer.
12. As we have now create the rot reducer and the user itself, we will now start creatin gour store.js file.
    <!-- Inisde store.js -->
   ### => import {compose, createStore applyMiddleware} from "redux"
   ### => import {logger} from "redux-logger"

   ### => import {rootReducer} from "path";

   ### => const middelWares=[logger];
   ### => const composedEnhancers = compose(applyMiddleware(...middleWares));

   ### => export const store = createStore(rootreducer, undefined, composedEnhancers);

<!-- Due to deprecation of creatStore, we have to use ** configureStore ** from react Toolkit-->
   ### => import { configureStore } from "@reduxjs/toolkit";
   ### => import logger from "redux-logger";
   ### => import { rootReducer } from "./root-reducer/rootreducer";

   ### => export const store = configureStore({
    reducer: rootReducer,
    middleware: [logger],
   ### => });

13. Now we have set up our store. we have to make the app to use this store now.
14. So we will open the index.js file and set up our store.
     <!--Inisde index.js  -->
   ### => import {Provider} from "react-redux";
   ### => import {store} from "pathofstore"
<!-- Inside the render method of index.js, we need to wrap the entire app component in the provider-->
   ### => <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
   ### => </Provider>
15. No we have technically set up the store to be used by the app.
16. And Now we have to dispatch the action from component to the user and also need the values from the reducers to the component back.
17. We have to now move the setCurrentUser in the app js.
18. And also creating a file in Action folder as user-action.js to make a dispatch function.
    <!-- inisde user-action.js -->
    ### => import {createAction} from utils
    ### => const setCurrentUser =(user)=>
    ### => createAction(USER-ACTION_TYPES.ACTION, user);

    
<!-- Inisde app.js -->
19. we now have to dispatch the setCurrent user value
    ### => import {useDispatch} from "react-redux";
    <!-- inside the functio  ()=>{ -->
    ### => const dispatch = useDispatch();
    ### => dipatch(setCurrentUser(user));
20. Here the user is the objevt of the user which is currently signed in the app.
21. and the setCurrentUser is the function from the reducer which set the new state with the values of the logged in user.
22. As we have dipatched the value in the store and saved it, now we need to access the value from the store in the various components. 
23. We need the useSelector hook in react redux to interact with the component from the redux-store.
<!-- inisde any component which need the values from the redux-store -->
   ### => import {useSelector} from "react-redux";
   <!-- inside the component function ()=>{ -->
   ### => const currentuser=useSelector((state)=>state.user.currentUser) 
24. As we may need to use the value again at some other component, we can make a user-selector file which will have this code and we can access it anywhere.
<!-- Inside user-selector.js -->
   ### => export const selectCurrentUser =(state)=>state.user.currentUser;
25. Now we can use the value of the selectCurrentuser from the store.
      <!-- any component  -->
   ### => import {useSelector} from "react-redux"; 
   ### => import {selectCurrentUser} from "/path";
   ### => const user = useSelector(selectCurrentUser);
