PYTHON = /usr/bin/env python3
TOP_SRCDIR = .
PYCODESTYLE = `which pycodestyle` --repeat
COVERAGE = `which coverage`
PYFLAKES = `which pyflakes`

check-pycodestyle:
	find $(TOP_SRCDIR) -path ./data -prune -o -name \*.py | grep -E "api|digital" | \
		grep -vE "venv|migrations" | sort -u | xargs $(PYTHON) $(PYCODESTYLE)

.PHONY: check-pycodestyle

check-pyflakes:
	find $(TOP_SRCDIR) -path ./data -prune -o -name \*.py | grep -E "backend|dashboard|api" | \
		grep -Ev "parser/ddex/dsr[main]{0,4}[0-9]{2,3}/(raw|_[a-z])" | \
		grep -v "__init__.py" | grep -v "dsrmain.py" | grep -v "venv" | \
		grep -v "backend/migrations/" | grep -v "extern" | grep -v "web/static" | \
		grep -v "salesreporting.py" | sort -u | xargs $(PYFLAKES)

.PHONY: check-pyflakes

check-coverage:
	$(COVERAGE) run --source 'api' manage.py test --pattern="test_*.py"
	$(COVERAGE) report -m

run-tests:
	$(PYTHON) manage.py test --pattern="test_*.py"

.PHONY: run-tests


all: check-pycodestyle check-pyflakes check-coverage run-tests
