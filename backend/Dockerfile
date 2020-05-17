# Take lightweight python image from docker registry
FROM python:3.7-alpine
ENV PYTHONUNBUFFERED=1

# Install some packages on Ubuntu
RUN apk add --no-cache linux-headers bash gcc git \
    musl-dev libjpeg-turbo-dev libpng libpq \
    uwsgi uwsgi-python3 \
    zlib-dev libmagic \
    # Postgres
    postgresql-dev

# Define start for all non-absolutу paths in container
# The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD
WORKDIR /code

# Let's copy file with require packages and install it
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install -U -r requirements.txt

# Сopy our code if not using docker-compose volumes for syncing
COPY . /code

# Command uses if not define in docker-compose file
CMD python manage.py migrate && python manage.py runserver