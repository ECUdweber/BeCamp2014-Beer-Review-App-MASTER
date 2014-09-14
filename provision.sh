#!/bin/bash

# Install keys for 3rd party repos
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 561F9B9CAC40B2F7
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10


# Add HTTPS support to APT
apt-get install -y apt-transport-https ca-certificates

# Add the passenger repository
echo 'deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main' > /etc/apt/sources.list.d/passenger.list
chown root: /etc/apt/sources.list.d/passenger.list
chmod 600 /etc/apt/sources.list.d/passenger.list

# Add the Postgresql repo
echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main 9.4" > /etc/apt/sources.list.d/pgdg.list
chown root: /etc/apt/sources.list.d/pgdg.list
chmod 600 /etc/apt/sources.list.d/pgdg.list

apt-get update -qq

apt-get install -y moreutils postgresql-9.4 libpq-dev git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libgdbm-dev libncurses5-dev automake libtool bison libffi-dev nginx-extras passenger

curl -L https://get.rvm.io | bash -s stable

usermod -a -G rvm vagrant

source /etc/profile

rvm install 2.1.2

su -l -c "createuser -s vagrant" postgres

echo "host    all             vagrant             127.0.0.1/32            trust" | cat - /etc/postgresql/9.4/main/pg_hba.conf | sponge /etc/postgresql/9.4/main/pg_hba.conf
chown postgres:postgres /etc/postgresql/9.4/main/pg_hba.conf

service postgresql restart

# Load the data. Needs to be a rake instead of using sql file
su -l -c "cd /vagrant; psql -d postgres -f beer_app.sql;" vagrant

su -l -c "cd /vagrant; gem install bundler; bundle install;" vagrant

RUBY=`cd /vagrant; passenger-config --ruby-command | grep "Command:" | cut -d ' ' -f 4`

echo "passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;" > /etc/nginx/conf.d/passenger.conf

echo "passenger_ruby $RUBY;" >> /etc/nginx/conf.d/passenger.conf

cp /vagrant/nginx-dev.conf /etc/nginx/sites-enabled/dev.conf

service nginx restart

done
