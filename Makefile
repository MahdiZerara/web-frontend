SHELL=bash
.SHELLFLAGS=-ec -o pipefail

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build
build: ## generate a Webpack build for the specified environment   
build:
ifeq ($(ENVIRONMENT),dev)
	npm run dev:build
else ifeq ($(ENVIRONMENT),staging)
	npm run staging:build
else ifeq ($(ENVIRONMENT),prod)
	npm run prod:build
else
	@echo "Invalid environment specified: $(ENVIRONMENT)"
endif

.PHONY: serve
serve:	## serve the Webpack build for the specified environment 
serve:
ifeq ($(ENVIRONMENT),dev)
	npm run dev:serve
else ifeq ($(ENVIRONMENT),staging)
	npm run staging:serve
else ifeq ($(ENVIRONMENT),prod)
	npm run prod:serve
else
	@echo "Invalid environment specified: $(ENVIRONMENT)"
endif

.PHONY: unit-tests
unit-tests:	## run unit tests with or without the watch mode 
unit-tests:
	npm run test:unit-lint
ifeq ($(MODE),watch)
	npm run test:unit-watch
else
	npm run test:unit
endif

.PHONY: e2e-tests
e2e-tests:	## run end-to-end tests 
e2e-tests:
	npm run test:e2e-lint
	npm run test:e2e

.PHONY: build-docker-image
build-docker-image: ## Build the Docker image for the ReactJS application
build-docker-image:
ifeq ($(ENVIRONMENT),staging)
	docker build -t reactjs-staging-app --build-arg ENVIRONMENT=$(ENVIRONMENT) -f ./build/Dockerfile .
else ifeq ($(ENVIRONMENT),prod)
	docker build -t reactjs-prod-app -f ./build/Dockerfile .
else
	@echo "Invalid environment specified: $(ENVIRONMENT)"
endif

.PHONY: run-docker-image
run-docker-image: ## Run the Docker image for the ReactJS application
run-docker-image:
ifeq ($(ENVIRONMENT),staging)
	docker run -p 8080:80 reactjs-staging-app
else ifeq ($(ENVIRONMENT),prod)
	docker run -p 8080:80 reactjs-prod-app
else
	@echo "Invalid environment specified: $(ENVIRONMENT)"
endif
