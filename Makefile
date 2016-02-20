.PHONY: all

all: index.html

index.html: slide.md
	bundle exec ruby build.rb > index.html
