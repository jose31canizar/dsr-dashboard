A lot of our work is about connecting digital service providers (DSPs), like Spotify or Youtube, and societies that handle musical rights.
DSPs send us digital sales reports (DSRs), where they detail music sales.
We crunch this data and give societies the information they need.

A certain society that happens to be one of our best clients needs a dashboard that shows the statistics of DSRs during a given period, and as usual they need it done yesterday.
We started developing a basic API using the djangorest framework, which includes a couple of dummy calls.
Please add the missing calls to the API and create DSR statistics page using a front-end framework of your choice.

Our DB contains the following tables:

* DSR
* Statistics (of the DSR)
* Currency
* Territory
* Periodicity

We use Django2 and python3.6 for this project.

## Run test server
`python manage.py testserver api/fixtures/dummy_data.json`

## Load dummy data
`python manage.py loaddata dummy_data`

## Run test
`make all`
