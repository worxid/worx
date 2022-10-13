<h1>Contributing</h1>

We wouldfor you to contribute to Worx-ID and help make it better! We want contributing to Worx-ID to be fun, enjoyable, and educational for anyone and everyone. All contributions are welcome, including features, bugfixes, and documentation changes, as well as updates and tweaks, blog posts, workshops, and everything else.

## Code of conduct

Help us keep Worx-ID open and inclusive. Please read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## Security and Privacy

We take the security of Worx-ID code, software, and cloud platform very seriously. If you believe you have found a security vulnerability in Worx-ID, we encourage you to let us know right away. We will investigate all legitimate reports and do our best to quickly fix the problem.

Please report any issues or vulnerabilities to fariz@worx.id, instead of posting a public issue in GitHub. Please include the Worx-ID version identifier, by running `surreal version` on the command-line, and details on how the vulnerability can be exploited.

When developing, make sure to follow the best industry standards and practices.

## External dependencies

Please avoid introducing new dependencies to Worx-ID without consulting the team. New dependencies can be very helpful but also introduce new security and privacy issues, complexity, and impact total docker image size. Adding a new dependency should have vital value on the product with minimum possible risk.

## Introducing new features

We would you to contribute to Worx-ID, but we would also like to make sure Worx-ID is as great as possible and loyal to its vision and mission statement. For us to find the right balance, please open a question on [GitHub discussions](https://github.com/worxid/worx/discussions) with any ideas before introducing a new pull request. This will allow the Worx-ID community to have sufficient discussion about the new feature value and how it fits in the product roadmap and vision.

This is also important for the Worx-ID lead developers to be able to give technical input and different emphasis regarding the feature design and architecture. Some bigger features might need to go through our [RFC process](https://github.com/worxid/rfc).

## Submitting a pull request

Branch naming convention is as following 

`TYPE-ISSUE_ID-DESCRIPTION`

For example:
```
bugfix-548-ensure-queries-execute-sequentially
```

Where `TYPE` can be one of the following:

- **refactor** - code change that neither fixes a bug nor adds a feature
- **feature** - code changes that add a new feature
- **bugfix** - code changes that fix a bug
- **docs** - documentation only changes
- **ci** - changes related to CI system

For the initial start, fork the project and use git clone command to download the repository to your computer. A standard procedure for working on an issue would be to:

1. Clone the `worxid` repository and download to your computer.
```bash
git clone https://github.com/worxid/worx
```

1. Pull all changes from the upstream `main` branch, before creating a new branch - to ensure that your `main` branch is up-to-date with the latest changes:
```bash
git pull
```

2. Create new branch from `main` like: `bugfix-548-ensure-queries-execute-sequentially`:
```bash
git checkout -b "[the name of your branch]"
```

3. Make changes to the code, and ensure all code changes are formatted correctly:
```bash
cargo fmt
```

4. Commit your changes when finished:
```bash
git add -A
git commit -m "[your commit message]"
```

5. Push changes to GitHub:
```bash
git push origin "[the name of your branch]"
```

6. Submit your changes for review, by going to your repository on GitHub and clicking the `Compare & pull request` button.

7. Ensure that you have entered a commit message which details about the changes, and what the pull request is for.

8. Now submit the pull request by clicking the `Create pull request` button.

9. Wait for code review and approval.

10. After approval, merge your pull request.

## Other Ways to Help

Pull requests are great, but there are many other areas where you can help.

### Blogging and speaking

Blogging, speaking about, or creating tutorials about one of Worx-ID's many features. Mention [@worxid](https://twitter.com/worxid) on Twitter, and email fariz@worx.id so we can give pointers and tips and help you spread the word by promoting your content on the different Worx-ID communication channels. Please add your blog posts and videos of talks to our [showcase](https://github.com/worxid/showcase) repo on GitHub.

### Presenting at meetups

Presenting at meetups and conferences about your Worx-ID projects. Your unique challenges and successes in building things with Worx-ID can provide great speaking material. We’d love to review your talk abstract, so get in touch with us if you’d like some help!

### Feedback, bugs, and ideas

Sending feedback is a great way for us to understand your different use cases of Worx-ID better. 
If you want to share your experience with Worx-ID, or if you want to discuss any ideas, you can start a discussion on [GitHub discussions](https://github.com/worxid/worx/discussions), chat with the [Worx-ID team on Discord](https://surrealdb.com/akvqngA8), or you can tweet [@worxid](https://twitter.com/worxid) on Twitter. If you have any issues, or have found a bug, then feel free to create an issue on [GitHub issues](https://github.com/worxid/worx/issues).

### Documentation improvements

Submitting documentation updates, enhancements, designs, or bug fixes, and fixing any spelling or grammar errors will be very much appreciated.

### Joining our community

Join our growing community around the world, for help, ideas, and discussions regarding Worx-ID.

- View our official [Blog](https://medium.com/worxid)
- Join our [Dev community](https://dev.to/worxid)
- Chat live with us on [Discord](https://discord.gg/akvqngA8)
- Questions tagged #worxid on [StackOverflow](https://stackoverflow.com/questions/tagged/worxid)
