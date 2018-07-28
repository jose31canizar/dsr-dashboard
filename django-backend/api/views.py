from api import models, serializers

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def count(request):
    return Response(headers={'X-Total-Count': models.DSR.objects.count()})


@api_view(['GET'])
def dsr(request, pk):
    try:
        dsr = models.DSR.objects.get(pk=pk)
        data = serializers.DSRSerializer(dsr).data
    except models.DSR.DoesNotExist:
        data = None
    return Response(
        {'data': data, },
        headers={'X-Total-Count': 1 if data else 0}
    )

@api_view(['GET'])
def statistics(request, pk):
  dsrStatistics = models.Statistics.objects.get(pk=pk)
  data = serializers.StatisticsSerializer(dsrStatistics).data
  return Response({
    'data': data
  })

@api_view(['GET'])
def fullDSR(request):
  dsrs = models.DSR.objects.all()
  data1 = [serializers.DSRSerializer(dsr).data for dsr in dsrs]
  dsrStatistics = models.Statistics.objects.all()
  data2 = [serializers.StatisticsSerializer(dsr).data for dsr in dsrStatistics]
  i = 0
  while i < len(data1):
    data1[i].update(data2[i])
    i+=1

  return Response({
    'data': data1
  })

@api_view(['GET'])
def currency(request, pk):
  try:
    dsrCurrency = models.Currency.objects.get(pk=pk)
    data = serializers.CurrencySerializer(dsrCurrency).data
  except models.Currency.DoesNotExist:
    data = None
  return Response({
    'data': data
  })

@api_view(['GET'])
def all_currency(request):
  try:
    dsrCurrency = models.Currency.objects.all()
    data = [serializers.CurrencySerializer(currency).data for currency in dsrCurrency]
  except models.Currency.DoesNotExist:
    data = None
  return Response({
    'data': data
  })

@api_view(['GET'])
def territory(request, pk):
  try:
    dsrTerritory = models.Territory.objects.get(pk=pk)
    data = serializers.TerritorySerializer(dsrTerritory).data
  except models.Territory.DoesNotExist:
    data = none
  return Response({
    'data': data
  })


@api_view(['GET'])
def allTerritories(request):
  try:
    dsrTerritories = models.Territory.objects.all()
    data = [serializers.TerritorySerializer(dsrt).data for dsrt in dsrTerritories]
  except models.Territory.DoesNotExist:
    data = none
  return Response({
    'data': data
  })

@api_view(['GET'])
def periodicity(request, pk):
  try:
    dsrPeriodicity = models.Periodicity.objects.get(pk=pk)
    data = serializers.PeriodicitySerializer(dsrPeriodicity).data
  except models.Periodicity.DoesNotExist:
    data = None
  return Response({
    'data': data
  })