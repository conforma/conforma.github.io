
help:
	@grep '[[:space:]]##[[:space:]]' Makefile | sed 's/^\(.*\):.*##\(.*\)$$/#\2\nmake \1\n/'

website/themes/antora-default-ui-hugo-theme:
	@git submodule update --init

hugo-theme: website/themes/antora-default-ui-hugo-theme

hugo-server: hugo-theme ## Run hugo server for website hacking
	@cd website && hugo server --config hugo.toml

antora-local-build: ## Build antora docs once using your locally checked out git repos
	@cd antora && hack/local-build.sh

antora-local-live: ## Live build antora docs your locally checked out git repos
	@cd antora && hack/local-live.sh

build-antora: ## Build antora docs
	@cd antora && npm ci && npm run build

build-antora-fast: ## Build antora docs without re-fetching sources
	@cd antora && npm run build:fast

# Fixme: Not sure how to make the stylesheet and javascript urls work
PWD=$(shell pwd)
build-hugo: hugo-theme ## Build hugo docs
	@cd website && hugo --config hugo.toml
	@echo file://$(PWD)/public/index.html

build-all: build-hugo build-antora

ifndef THEME_NAME
THEME_NAME=night-owl
endif
download-highlight-js-theme:
	curl -s https://highlightjs.org/static/demo/styles/$(THEME_NAME).css > common/css/highlightjs-theme.css
