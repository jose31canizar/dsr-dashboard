from rest_framework import serializers

from api import models

class DSRSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DSR
        fields = '__all__'

class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Statistics
        fields = '__all__'

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Currency
        fields = '__all__'

class TerritorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Territory
        fields = '__all__'

class PeriodicitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Periodicity
        fields = '__all__'