from django.shortcuts import render

def index(r):
    try:
        return render(r, 'index.html')
    except:
        return render(r, 'index.html')
