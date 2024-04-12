run:
	@docker run \
		--name qr --rm -p 9013:80 \
		-v ./src:/usr/share/nginx/html:ro nginx