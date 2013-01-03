from django.forms import widgets
from rest_framework import serializers
from eatstatic import post


class PostSerializer(serializers.Serializer):

    title = serializers.CharField(required=False,
                                  max_length=300)

    slug = serializers.CharField(required=False,
                                  max_length=300)

    content = serializers.CharField(widget=widgets.Textarea,
                                 max_length=100000)

    def restore_object(self, attrs, instance=None):
        """
        Create or update a new post instance.
        """
        if instance:
            # Update existing instance
            instance.title = attrs['title']
            instance.content = attrs['content']
            instance.slug = attrs['slug']
            return instance

        # Create new instance
        return post
