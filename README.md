# sass-lint-config-airhelp
npm package with AirHelp SASSLint shareable config
##Usage
1. Install `sass-lint`
```
  npm install --save-dev sass-lint
```
2. Create `.sass-lint.yml` in root directory same as `package.json`
3. Add path AirHelp SASSLint shareable config to to the `.sass-lint.yml` file 
```yml
options:
  config-file: node_modules/sass-lint-config-airhelp/.sass-lint.yml
```
##Contribution
Please introduce changes in separate PRs.

This package is using [simple-git-changelog](https://github.com/ianhenderson/simple-git-changelog) for creating changelog. Please use following prefixes for all commits that are supposed to be part of changelog:
* `changelog`
* `fix`
* `docs`
* `chore`
* `feat`
* `feature`
* `refactor`
* `update`

for example:
```
git commit -m "fix: lorem ispum dolor"
```
