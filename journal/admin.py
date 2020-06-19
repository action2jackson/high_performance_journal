from django.contrib import admin
from journal.models import Goal, Dream, Event, Note, Task

# Register your models here.

admin.site.register(Goal)
admin.site.register(Dream)
admin.site.register(Event)
admin.site.register(Note)
admin.site.register(Task)


