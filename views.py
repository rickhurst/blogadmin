from django.template import Context, loader
from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext


def home(request):

    return render_to_response('home.html', {}, context_instance=RequestContext(request))
