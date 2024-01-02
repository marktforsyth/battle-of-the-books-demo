# Battle of the Books

A fun little family competition to test how well everyone knows these classic books.

## Run
I use the `pandas` library of `python3` to parse the data, and `yarn` to run the front end.
```
./setup.sh
yarn dev
```

## Fun Ideas

I made some unconventional design choices in this project, some of which turned out well and all of which helped me to learn and explore.

### Dedicated UI Elements
Instead of using separate CSS files linked by `className`s, giving each file its own CSS in JS `style` variable, or using tailwind, I decided to try a different approach for styling my components.

I took inspiration from Jetpack Compose. In Compose, I can use optional parameters to style a built-in UI component. For example:
```
Text(
  text = "Hello World",
  color = Color.Blue,
  fontSize = 24.sp,
)
```

To me this feels a little more straightforward and elegant, so I decided to copy it! None of my pages or normal components have any CSS in JS, nor do they link to stylesheets (except for `index.css` which I needed). Instead, my CSS in JS stays inside the UI folder, and then I reuse these components everywhere else. I like how this turned out (although if I did it again, I might just use Material Design instead of copying it).

### Declarative Conditionals

In this project I wanted to see how far I could push JS to make it more declarative and immutable.

When I use Rust or Kotlin, I can create conditional expressions (`match`, `when`, etc.) without having gastly syntax (ternary operators). I wanted to see if I could replicate that in TypeScript.

Unable to actually create my own overload for the `if` statement, I just made a function which takes:
  - The condition
  - What to return if true
  - What to return if false

I made a similar function for `match`. These functions were...significantly worse than ternary operators (which is saying something!). So, I discontinued that. Now I just make a function whenever I need a conditional expression (which I've decided is always, because I'm stubborn and why not). It works great! Having to name things actually makes it more readable.

### Typed Reducer Payloads

I like global state systems. But when I first started using the reducer hook, my actions looked like this:
```
type Action = {
  command: string,
  payload: int | string | SomeOtherThing,
}
```

Combining all possible payload types with a union operator is certainly better than setting `payload` to type `any`, but it's still messy. What's more, letting `command` be a `string` makes it much easier to dispatch misspelled actions without the linter (or even the interpreter) catching the mistake.

For this project, I used an `enum` to create the commands. If they had had payloads, I would have used a discriminated union (look in [thompcal](https://github.com/marktforsyth/thompcal-demo) for an elaborate example). This can be more lengthy, but much cleaner.
