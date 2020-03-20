# World Time Web Component

**Represents an example of using web components standard with Angular.**

- To create a web component you should define it in `the app.module.ts`. 
An example provided in the constructor of `AppModule`.
- `web-component.js` file is used to concatenate all scripts into single file and move 
it to the separate folder whit styles.
- To build a web component you should use script `build:production:web-component` 
from `packaje.json` file. It will create new folder `dist/web-component/world-time` 
with the web component, which will include two files `world-time.css` and 
`world-time.js`.

**Example of usage:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Application</title>
  <link rel="stylesheet" href="world-time.css">
</head>
<body>
  <world-time></world-time>

  <script src="world-time.js"></script>
</body>
</html>
```


