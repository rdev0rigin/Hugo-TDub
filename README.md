# Hugo-TDub (0.0.1.alpaha)
A  Hugo starter with TypeScript and Webpack (And CSS). Thats it.

# Dev Deploy

```shell
cd {project dir}
yarn 
yarn start
```

# How To Use

Webpack is set up to read from `src/index.ts` and `src/index.css`. It deploys the bundles to your `/static` dir where Hugo will find them. `layouts/_default/basof.html` contains the `<script />` and style `<link />`. You will have to remove  or edit `layouts/_default/single.html` and `layouts/_default/single.html` if you are going to usa a theme.

