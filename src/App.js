import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth } from './firebase/firebase.util';

const HatsPage = () =>
(
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

class App extends React.Component {

  constructor() 
  {
    super();

    this.state = 
    {
      currentUser : null
    }
  }

  //We are creating a class variable which will hold the return callback function to close the connection to firebase and free up memory
  //otherwise we will have memory leaks
  unsubscribeFromAuth = null;

  componentDidMount()
  {
    //This is an observer pattern available from firebase SDK where anytime the user that is logged in has a state change, the backend will
    //inform our app of this change. If the user signed out of the google or another partner , it will send a null. 
    //For clearnup we get back a unsubscription function from firebase to close this connection which is registered with firebase so that 
    //there are no memory leaks and then we call it whenever our App component is dismounting
    this.unsubscribeFromAuth = auth.onAuthStateChanged(
      (user) =>
      {
        this.setState({currentUser: user});
        console.log("onAuthStateChanged called by firebasee, User Details as follows:\n", user);
      }
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
        <Header currentUser={this.state.currentUser}/>
        {/*this header component will always render no matter what for this app on any path, this helps setup
        the page without having to add header on everypage*/}
        <Switch> 
          <Route exact path='/' component={HomePage} />
          <Route exact path='/hats' component={HatsPage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
