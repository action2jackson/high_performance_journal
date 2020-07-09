from django.contrib import admin
from journal.models import Goal, Dream, Event, Note, Task, Events

# Register your models here.

admin.site.register(Goal)
admin.site.register(Dream)
admin.site.register(Event)
admin.site.register(Note)
admin.site.register(Task)
admin.site.register(Events)



