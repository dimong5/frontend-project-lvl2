gendiff:
	node bin/gendiff.js
run:
	bin/gendiff.js
lint:
	npx eslint .
install:
	npm install
test:
	npx -n --experimental-vm-modules jest
test-coverage:
	npx -n --experimental-vm-modules jest --coverage --coverageProvider=v8