from datetime import datetime, timedelta
from calendar import HTMLCalendar
from .models import Event
import datetime as dt


class Calendar(HTMLCalendar):
	# Customize HTMLCalendar 
	def __init__(self, year=None, month=None):
		self.year = year
		self.month = month
		super(Calendar, self).__init__()

	def formatday(self, day, events):
		# filter events by day		
		events_per_day = events.filter(start_time__day=day)
		d = ''
		for event in events_per_day:
			# This will call function in models.py to get event_edit url
			d += f'<li> {event.get_html_url} </li>'

		if day != 0:
			# formats day as a td
			return f"<td><span>{day}</span><ul> {d} </ul></td>"
		return '<td></td>'

	def formatweek(self, theweek, events):
		week = ''
		for d, weekday in theweek:
			# Add days and events to every week
			week += self.formatday(d, events)
		return f'<tr> {week} </tr>'

	def formatmonth(self, withyear=True):
		# filter events by year and month
		events = Event.objects.filter(start_time__year=self.year, start_time__month=self.month)
		# formats a month as a table
		cal = f'<table border="0" cellpadding="0" cellspacing="0" class="calendar">\n'
		# Calling built in HTMLCalendar functions 
		cal += f'{self.formatmonthname(self.year, self.month, withyear=withyear)}\n'
		cal += f'{self.formatweekheader()}\n'
		for week in self.monthdays2calendar(self.year, self.month):
			# Call formatweek function to get the days of the month
			cal += f'{self.formatweek(week, events)}\n'
		return cal
        