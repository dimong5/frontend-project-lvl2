lint:
	npx eslint .
install:
	npm install
test:
	npx -n --experimental-vm-modules jest --watch
test-coverage:
	npx -n --experimental-vm-modules jest --coverage --coverageProvider=v8