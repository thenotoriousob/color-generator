### Project Enhancements

- Added the copy to clipboard tooltip, this then changes to Copied if the user clicks,
  then reverts back when they mouse off
- Added a hover effect to the color block that makes it slightly bigger
- Added a box shadow hover to the picker, select and button
- These all work for keyboard users too


### Code  Structure
- Uses event delegation to create the event handlers so there is no issues creating them
  when the elements are created dynamically
- I have created a generic create event listener function so we can easily create different
  types of event listener
- I used syntax for deconstructing a value from an object inside an object
- I went for the async/await just because I thought it made it clearer that the renderColors function
  was getting called from there, rather than being lost in the .thens
- A try and catch has been added to the api call to catch any errors
