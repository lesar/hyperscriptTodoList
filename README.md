# hyperscriptTodoList

This is an todo list example. I have choose to write this example because there are plenty todolist example so people are familiar with its logic.
What's new in this example is the tool combination used to develop it.

I have found few example using this tools combination:

- [TypeScript][1] a beautiful meta language
- [Infernojs][2] a great react like framework
- [Redux][3] a predictable state container for JavaScript apps to make more easy store and state manage on application component
- [inferno-redux][14] an inferno library to pass context.store to each component and more
- [Hyperscript][4] an alternative to [JSX][5] way
- [inferno-hyperscript][15] Hyperscript syntax for Inferno templates
- [Hyperscript helper][12] useful way to take benefit by Hyperscript
- [W3CSS][13] a modern CSS framework with built-in responsiveness
- [Webpack][6] to put all together

## Why this tool set

### TypeScript
Is useful in many way: you can use **class**, **interface**, **enum**, ... And at last using it's interface you can make useful control on parameter typechecking, presence etc. Avoiding the need to use [PropTypes][7].
### Infernojs
Is capable to providing the greatest [React][8] functionality but in minor size.
Inferno bring lifecycle events on functional Component too.
### Redux
On Inferno and on all React like framework it's tedious encapsulate state in upper component and share it down from the root component to leaves component that need it. It's complex too. So are born framework like [Flux][11] but the multiple state existence and multiple store component make it too complex to my experience. See [Flux concepts][10] and [Flux overview][9].  
[Redux][3] to my opinion take the Flux way but is more simplex: one plain object is the single application state. **Action** are plain object that encapsulate data that will update the state. The state will update only if an action will be generated. To make this change on state a function **reducer** take the actions, the last state and calculate the new state.
In Redux there is only one **Store** that bound together State, Actions, Reducer. The library inferno-redux by Provider component take this Store to all application components making easy to use it.
### Hyperscript
I like **Hyperscript**, is one of the reason why I have write this example. I find few not trivial example to use it so I write one. I prefer it over JSX because is vanilla javascript and you haven't to compile it before use. It is nothing to learn: is very simple. It's syntax is very concise specially if use together **Hyperscript-helper**.
### W3CSS
A fantastic way to write responsive html code using a small css and **no javascript**.
### Webpack
Is an useful tool binding together several functionally you can have only if you use many building framework.

## Only code?
No this is an example so I will write all necessary comment on the code. I'm new to Inferno so I think that my comment will be helpful for beginners. I start to write comment next day and then change this rows. Now I have write 7% comments.

## How to start
You have to install [npm][16] then you have to go on terminal and change folder to source project and do `npm install` this download and install all dependencies.

`npm run start` start a server on port 8080, you can see it on your browser on url http://localhost:8080/

`npm run build` make a production build on *dist* folder. Here you can see the code is more small due to production optimization.


[1]:https://www.typescriptlang.org
[2]:https://github.com/infernojs/inferno
[3]:https://redux.js.org/
[4]:https://github.com/hyperhype/hyperscript
[5]:https://jsx.github.io/
[6]:https://webpack.js.org
[7]:https://reactjs.org/docs/typechecking-with-proptypes.html
[8]:https://reactjs.org
[9]:https://facebook.github.io/flux/docs/in-depth-overview.html
[10]:https://github.com/facebook/flux/tree/master/examples/flux-concepts
[11]:https://facebook.github.io/flux/
[12]:https://github.com/ohanhi/hyperscript-helpers
[13]:https://www.w3schools.com/w3css/default.asp
[14]:https://github.com/infernojs/inferno/tree/master/packages/inferno-redux
[15]:https://github.com/terinjokes/inferno-hyperscript
[16]:https://www.npmjs.com/
