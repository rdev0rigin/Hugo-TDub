# Hugo-TDub (0.0.1.alpha)
A  Hugo starter with TypeScript and Webpack (And CSS). And that's it.

# Dev Deploy

```shell
cd {project dir}
yarn 
yarn start
```
# Site Build

```shell
yarn build
```

Then just insert the contents of `public/` into your servers public folder.

# How To Use

Webpack is set up to read from `src/`. It deploys the bundles to `static/` where Hugo will find them. `layouts/_default/baseof.html` contains the `<script />` and style `<link />`. You will have to remove  or edit `layouts/_default/single.html` and `layouts/_default/single.html` if you are going to usa a theme. You will also want to remove or edit `layouts/index.html`
