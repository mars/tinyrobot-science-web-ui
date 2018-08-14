#  🤖🔬 tinyrobot.science Web UI

Built with [Next.js](https://nextjs.org/) on Heroku.

### Part of a reference suite

| [Terraform config](https://github.com/mars/tinyrobot-science-terraform) | Web UI | [API](https://github.com/mars/tinyrobot-science-api) |
|-----------|------------|---------|
| infrastructure | front-end app (this repo) | backend app |

## Requires

* Heroku
  * [command-line tools (CLI)](https://devcenter.heroku.com/articles/heroku-command-line)
  * [a free account](https://signup.heroku.com)
* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js](https://nodejs.org)
* [Next.js](https://github.com/zeit/next.js)

## Development

`git clone` this repo to your local machine, and then:

```bash
cd tinyrobot-science-web-ui/
npm install
API_URL=http://127.0.0.1:5001 npm run dev
```
