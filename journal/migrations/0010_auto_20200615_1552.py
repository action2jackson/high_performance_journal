# Generated by Django 3.0.3 on 2020-06-15 20:52

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0009_note'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='text',
            field=ckeditor.fields.RichTextField(null=True),
        ),
    ]
