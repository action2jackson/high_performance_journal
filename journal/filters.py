import django_filters

from .models import Dream

class DreamFilter(django_filters.FilterSet):
    class Meta:
        modal = Dream
        fields = {
            'title',
            'text',
            'created_date'
        }