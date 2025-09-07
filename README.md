# Test set up

Since the project is in early development and is going under a lot of changes, constantly updating the packages for testing would be tedious. As such I've opted to use the `npm link` to keep the test project up to date with the actual business logic.

1. Move to the `src` folder and execute the `npm link` command.
2. Move to the `tests` folder and execute the `npm link unofficial-avoindata-nodejs-client`.