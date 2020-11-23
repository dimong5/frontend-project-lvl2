gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
install:
	npm install
test:
	npx -n --experimental-vm-modules jest --watch
test-coverage:
	npm test -- --coverage --coverageProvider=v8