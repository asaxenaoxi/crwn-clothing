import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

const HatsPage = () =>
(
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

function App() {
  return (
    <div>
      {/*Switch will not allow to redender any other component as long as any part of the path mathes first
      It ensures no more than 1 route gets rendered. Without Switch, if there was no exact in the Route, 
      and we tried to goto /hats, route would have found / first rendered it and then went ot /hats and 
      rendered that too. Now when we add exact it will make sure only exact is matched. Now if you had no
      exact and had switch on and get to /hats, it would hit / match is and stop any other render. So it
      ensures only 1 component that came first in the list and gets matched is rendered. */}
      <Switch> 
        <Route exact='true' path='/' component={HomePage} />
        <Route exact='true' path='/hats' component={HatsPage} />
        <Route exact='true' path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
