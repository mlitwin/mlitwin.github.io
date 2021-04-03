DIAGRAMS := $(wildcard ./diagrams/*.mmd)
OUTPUTS := $(patsubst ./diagrams/%.mmd,./static/diagrams/%.svg,$(DIAGRAMS))

.PHONY: build
build: $(OUTPUTS)
	hugo

.PHONY: serve
serve:
	hugo --i18n-warnings server -D

.PHONY: preview
preview:
	hugo --i18n-warnings server

.PHONY: deploy
deploy:
	rm -rf ./public/*
	./deploy.sh

./static/diagrams/%.svg : ./diagrams/%.mmd
	mmdc -c  ./diagrams/config.json -i $< -o  $@

.PHONY: clean
clean:
	rm -f $(OUTPUTS)
