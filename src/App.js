import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import HomePage from './javascript/pages/homepage.page';
import ShopPage from './javascript/pages/shop.page';
import Header from './javascript/components/header.component';
import SignInAndSignUp from './javascript/pages/sign-in-and-sign-up.page';
import HatsPage from './javascript/pages/hats.page';

import { createUserProfileDocument, auth } from './javascript/utils/firebase.util';
import { connect } from 'react-redux';

//I need to deconstruct the specific objects from the complete import if there are more than 1 exports from the file.
import { setCurrentUser } from './javascript/redux/user.redux';

class App extends React.Component {

  /* We are removing the constructor because now out state is managed by redux and it has its own initializer.
  constructor() 
  {
    super();

    this.state = 
    {
      currentUser : null
    }
  }*/

  //We are creating a class variable which will hold the return callback function to close the connection to firebase and free up memory
  //otherwise we will have memory leaks
  unsubscribeFromAuth = null;

  componentDidMount()
  {
    //const {setCurrentUser} = this.props;
    //This is an observer pattern available from firebase SDK where anytime the user that is logged in has a state change, the backend will
    //inform our app of this change. If the user signed out of the google or another partner , it will send a null. 
    //For cleanup we get back a unsubscription function from firebase to close this connection which is registered with firebase so that 
    //there are no memory leaks and then we call it whenever our App component is dismounting
    //auth is initialized and the state changes only when someone clicks on sign-in/google sign-in and since function is subscribed at the time
    //of mounting of the app, it will get called once sign-in completes.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(
      async (userAuthObj) =>
      {
        //when there is no google sign in available in firebase then we get back a null so first need to check for null
        if(userAuthObj)
        {
          console.log("onAuthStateChanged called by firebasee, User Details as follows:\n", userAuthObj);
          const userQueryRef = await createUserProfileDocument(userAuthObj);

          //onSnapshot() is used to get data and then listen to the data if any changes happen 
          //*Tested: if the data changes in the firestore by hand , this function gets triggered and state is updated with it.
          //!!Question: if there is a cleanup function for onAuthStateChanged() is there a similar cleanup for onSnapshot() because 
          //it is a similar listener where the connection to firebase is maintained or it will cleanup every connection between 
          //firestore and the app after calling unsubscribeFromAuth() ?
          userQueryRef.onSnapshot(async (snapShot) => 
          {
            //This is a redux call instead of this.setState with currentUser, we are calling the property to fire an action to finally set the
            //currentUser in the redux store.
            this.props.setCurrentUser(
                                        {
                                          id: snapShot.id, 
                                          ...(snapShot.data()) 
                                        }
                                      );

            /*await this.setState({
                            currentUser: 
                            {
                              id: snapShot.id, 
                              ...(snapShot.data()) 
                              //snapShot.data() returns the data of the document where the user related data is stored and here we are
                              //spreading it into individual variables and storing it inside the currentUser object.
                            }
                          }*/ /*, () => {console.log(this.state)}*/ /*);*/

            //if i print the state here, it could or could not be the same as the one we set above because setState is an async function
            //so either we pass this to a then in setState or just make setState a sync func by calling await and for that we need to tell
            //JS that this anonymous function is async so we can call await on any other async functons.
            console.log("onSnapshot() : ", this.props.currentUser);
          });
          //This call always prints a null, because by the time onSnapshot is able to get the data and update the state, this has been executed, 
          //so technically this is never going to result in any good information unless the object mounts again in the scope without going to server
          //console.log("State update inside of onAuthStateChanged : ", this.state);
        }
        else
          this.props.setCurrentUser(null); //same as passing userAuthObj as it will come to this stage only when its null
          //this.setState({currentUser: null});
      }//end of anonymus function for auth.onAuthStateChanged()
    );
  }

  componentWillUnmount()
  {
    //We get this from the state change function call to firebase Auth and is told to react to call whenever this app will in future dismount
    this.unsubscribeFromAuth();
  }

  render() 
  {
    return (
      <div>
        {/*Switch will not allow to redender any other component as long as any part of the path mathes first
        It ensures no more than 1 route gets rendered. Without Switch, if there was no exact in the Route, 
        and we tried to goto /hats, route would have found / first rendered it and then went ot /hats and 
        rendered that too. Now when we add exact it will make sure only exact is matched. Now if you had no
        exact and had switch on and get to /hats, it would hit / match is and stop any other render. So it
        ensures only 1 component that came first in the list and gets matched is rendered. */}
        {/*<Header currentUser={this.state.currentUser}/> => this is not needed as we are now using redux
        Now Header is a HoC super charged component having access to currentUser from the redux store*/}
        <Header/>
        {/*this header component will always render no matter what for this app on any path, this helps setup
        the page without having to add header on everypage*/}
        <Switch> 
          <Route exact path='/' component={HomePage} />
          <Route exact path='/hats' component={HatsPage} />
          <Route exact path='/shop' component={ShopPage} />
          {/*<Route exact path='/signin' component={SignInAndSignUp} />*/}
          <Route exact path='/signin' render={() => 
                                                  (
                                                    this.props.currentUser 
                                                    ?
                                                    (<Redirect to='/'/>) 
                                                    :
                                                    (<SignInAndSignUp/>)  
                                                  )
                                              }
          />
        </Switch>
      </div>
    );
  }
}

//const mapStateToProps = null;
//const mapStateToProps = (reduxState) => ({currentUser: reduxState.user.currentUser}); <- One and the same thing as below, we are just redirecting 
const mapStateToProps = ({user}) => ({currentUser: user.currentUser});

//This function basically is listing down all the property to setter functions with the help of a dispatch() func from redux library which does nothing 
//but take the output of our action function which returns the action object which is then passed by dispatch func with current state and this action to
//the reducer to process the final outcome.
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

//The component that needs to user the value needs to connect() with mapStateToProps() func as first argument and the components that need to take
//action on the some redux state/store value need to access the action functions for that redux slice using mapToDispatchToProps() func so that it
//can be used in place of this.setState to set the value of that reducer object to whatever we want.